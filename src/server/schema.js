import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

import co from 'co';
import User from './user';

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection (fieldASTs) {
  return fieldASTs.selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = 1;

    return projections;
  }, {});
}

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'User creator',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the user.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    friends: {
      type: new GraphQLList(userType),
      description: 'The friends of the user, or an empty list if they have none.',
      resolve: (user, params, source, fieldASTs) => {
        var projections = getProjection(fieldASTs);
        return User.find({
          _id: {
            // to make it easily testable
            $in: user.friends.map((id) => id.toString())
          }
        }, projections);
      },
    }
  })
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: function() {
          return 'world';
        }
      },
      user: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          return User.findById(id, projections);
        }
      }
    }
  }),

  // mutation
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: {
        type: userType,
        args: {
          name: {
            name: 'name',
            type: GraphQLString
          }
        },
        resolve: (obj, {name}, source, fieldASTs) => co(function *() {
          var projections = getProjection(fieldASTs);

          var user = new User();
          user.name = name;


          return yield user.save();
        })
      },
      deleteUser: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (obj, {id}, source, fieldASTs) => co(function *() {
          var projections = getProjection(fieldASTs);
          console.log(id);
          return yield User.findOneAndRemove({_id: id});
        })
      },
      updateUser: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          name: {
            name: 'name',
            type: GraphQLString
          }
        },
        resolve: (obj, {id, name}, source, fieldASTs) => co(function *() {
          var projections = getProjection(fieldASTs);

          yield User.update({
            _id: id
          }, {
            $set: {
              name: name
            }
          });

          return yield User.findById(id, projections);
        })
      }
    }
  })
});

export var getProjection;
export default schema;

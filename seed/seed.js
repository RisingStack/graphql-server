import mongoose from 'mongoose';
import User from '../src/server/user';

// connect to mongo

mongoose.connect('mongodb://localhost/graphql');

// drop users collection

mongoose.connection.collections['users'].drop( function(err) {

  // create users

  User.create({
    _id: '559645cd1a38532d14349240',
    name: 'Han Solo',
    friends: []
  })

  .then(function (value) {

    return User.create({
      _id: '559645cd1a38532d14349241',
      name: 'Chewbacca',
      friends: ['559645cd1a38532d14349240']
    });
  })

  .then(function (value) {

    return User.create({
      _id: '559645cd1a38532d14349242',
      name: 'R2D2',
      friends: ['559645cd1a38532d14349246']
    });
  })

  .then(function (value) {

    return User.create({
      _id: '559645cd1a38532d14349246',
      name: 'Luke Skywalker',
      friends: ['559645cd1a38532d14349240', '559645cd1a38532d14349242']
    });
  })

  .then(function(){

    process.exit();

  });

});



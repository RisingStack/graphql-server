'use strict';

import {
  expect
}
from 'chai';
import request from 'co-supertest';
import mongoose from 'mongoose';
import server from './server';

var User = mongoose.model('User');

describe('graphql', function() {
  describe('query', function() {

    it('should return with user by id', function*() {
      var user = new User({
        name: 'John Doe'
      });

      var findByIdStub = this.sandbox.stub(User, 'findById').returnsWithResolve(
        user);

      var resp = yield request(server.listen())
        .get('/data')
        .query({
          query: `
          {
            user(id: "${user._id}") {
              name
            }
          }
          `
        })
        .expect(200)
        .end();

      expect(findByIdStub).to.calledWithMatch(user._id.toString(), {
        name: 1
      });

      expect(resp.body).to.be.eql({
        data: {
          user: {
            name: 'John Doe'
          }
        }
      });
    });

    it('should return with user by id with friends', function*() {
      var friend1 = new User({
        name: 'Friend One'
      });

      var friend2 = new User({
        name: 'Friend Two'
      });

      var user = new User({
        name: 'John Doe',
        friends: [friend1, friend2]
      });

      var findStub = this.sandbox.stub(User, 'find').returnsWithResolve(
        [friend1, friend2]);

      this.sandbox.stub(User, 'findById').returnsWithResolve(user);

      var resp = yield request(server.listen())
        .get('/data')
        .query({
          query: `
          {
            user(id: "${user._id}") {
              name
              friends {
                name
              }
            }
          }
          `
        })
        .expect(200)
        .end();

      expect(findStub).to.calledWithMatch({
        _id: {
          $in: [friend1._id.toString(), friend2._id.toString()]
        }
      }, {
        name: 1
      });

      expect(resp.body).to.be.eql({
        data: {
          user: {
            name: 'John Doe',
            friends: [{
              name: 'Friend One'
            }, {
              name: 'Friend Two'
            }]
          }
        }
      });
    });
  });

  describe('mutation', function() {
    it('should set user name', function*() {
      var user = new User({
        name: 'Smith Doe'
      });

      var findAndUpdateStub = this.sandbox.stub(User, 'update',
        function() {
          user.name = 'John Smith';
          return Promise.resolve(user);
        });

      this.sandbox.stub(User, 'findById').returnsWithResolve(user);

      var resp = yield request(server.listen())
        .post('/data')
        .send({
          query: `
          mutation M($userId: String! $name: String!) {
            updateUser(id: $userId name: $name) {
              name
            }
          }
          `,
          params: {
            userId: user._id,
            name: 'John Smith'
          }
        })
        .expect(200)
        .end();

      expect(findAndUpdateStub).to.calledWithMatch({
        _id: user._id.toString()
      }, {
        $set: {
          name: 'John Smith'
        }
      });

      expect(resp.body).to.be.eql({
        data: {
          updateUser: {
            name: 'John Smith'
          }
        }
      });
    });
  });
});

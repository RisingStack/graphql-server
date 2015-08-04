import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:mutation');
var userId = '559645cd1a38532d14349246';
var deleteId = '559645cd1a38532d14349242'
var names = ['Doe', 'Smith', 'Winston', 'Lee', 'Foo', 'Bar'];
var name = names[Math.floor(Math.random() * names.length)];

request
  .post('http://localhost:3000/data')
  .send({
    query: `
    mutation M($userId: String! $name: String!) {
      updateUser(id: $userId name: $name) {
        name
        friends {
          name
        }
      }
    }
    `,
    params: {
      userId: userId,
      name: name
    }
  })
  .end(function (err, res) {
    debug(err || res.body);
    debug('friends', res.body.data.updateUser.friends);
  });

request
  .post('http://localhost:3000/data')
  .send({
    query: `
    mutation M($name: String!) {
      createUser(name: $name) {
        name
        friends {
          name
        }
      }
    }
    `,
    params: {
      name: 'Wedge'
    }
  })
  .end(function (err, res) {
    debug(err || res.body);
    debug('created', res.body);
  });

request
  .post('http://localhost:3000/data')
  .send({
    query: `
    mutation M($userId: String!) {
      deleteUser(id: $userId) {
        name
        friends {
          name
        }
      }
    }
    `,
    params: {
      userId: deleteId
    }
  })
  .end(function (err, res) {
    debug(err || res.body);
    debug('deleted r2d2', res.body);
  });

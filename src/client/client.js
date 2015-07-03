import request from 'superagent';

var userId = '559645cd1a38532d14349246';
var query = `{
  hello,
  user(id: "${userId}") {
    name
    friends {
      name
    }
  }
}`;

request
  .get('http://localhost:3000/data')
  .query({
    query: query
  })
  .end(function (err, res) {
    console.log(err || res.body);

    console.log('friends', res.body.data.user.friends);
  });

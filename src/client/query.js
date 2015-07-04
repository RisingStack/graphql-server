import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:query');
var userId = '559645cd1a38532d14349246';

request
  .get('http://localhost:3000/data')
  .query({
    query: `{
      hello,
      user(id: "${userId}") {
        name
        friends {
          name
        }
      }
    }`
  })
  .end(function (err, res) {
    debug(err || res.body);
    debug('friends', res.body.data.user.friends);
  });

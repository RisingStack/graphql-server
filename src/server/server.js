import koa from 'koa';
import Router from 'koa-router';
import parseBody from 'co-body';
import mongoose from 'mongoose';
import {graphql} from 'graphql';
import schema from './schema';

let port = process.env.PORT || 3000;
let routes = new Router();
var app = koa();

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/graphql');
}

routes.get('/data', function* () {
  var query = this.query.query;

  this.body = yield graphql(schema, query);
});

routes.post('/data', function* () {
  var payload = yield parseBody(this);

  this.body = yield graphql(schema, payload.query, '', payload.params);
});

app.use(routes.middleware());

app.listen(port, () => {
  console.log('app is listening on ' + port);
});

module.exports = app;

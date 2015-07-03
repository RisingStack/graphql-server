import koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'co-body';
import mongoose from 'mongoose';
import {graphql} from 'graphql';
import schema from './schema';

let port = process.env.PORT || 3000;
let routes = new Router();
let app = koa();

mongoose.connect('mongodb://localhost/graphql');

routes.post('/data', function* () {
  var body = yield bodyParser.json(this);

  this.body = yield graphql(schema, body.query);
});

app.use(routes.middleware());

app.listen(port, () => {
  console.log('app is listening on ' + port);
});

module.exports = app;

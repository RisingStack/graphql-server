'use strict';

var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');

before(function () {
  chai.use(sinonChai);

  sinon.stub.returnsWithResolve = function (data) {
    return this.returns(Promise.resolve(data));
  };

  sinon.stub.returnsWithReject = function (error) {
    return this.returns(Promise.reject(error));
  };
});

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
});

afterEach(function () {
  this.sandbox.restore();
});

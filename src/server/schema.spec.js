'use strict';

import {expect} from 'chai';
import {getProjection} from './schema';

describe('schema', function () {
  describe('helpers', function () {
    it('should generate projection object', function () {
      var projection = getProjection({
        selectionSet: {
          selections: [
            {
              name: {
                value: 'name'
              }
            },
            {
              name: {
                value: 'age'
              }
            }
          ]
        }
      });

      expect(projection).to.be.eql({
        name: 1,
        age: 1
      });
    });
  });
});

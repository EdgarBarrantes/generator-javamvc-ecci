'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-javamvc-ecci:class', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/class'))
      .withPrompts(() => {
        var done = this.async();
        return done({ description: 'This is a description.' });
      })
      .withArguments(['Class'])
      .withLocalConfig({
        personInfo: {
          projectName: 'TestingProject',
          personName: 'Erian'
        }
      });
  });

  it('creates files', () => {
    assert.file(['TestingProject/Class.java']);
  });
});

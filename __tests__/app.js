'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-javamvc-ecci:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ projectName: 'TestingProject', personName: 'Erian' });
  });

  it('creates files', () => {
    assert.file([
      'TestingProject/TestingProjectController.java',
      'TestingProject/TestingProjectModel.java',
      'TestingProject/TestingProjectView.java',
      'TestingProject/README.TXT',
      'TestingProject/package.bluej'
    ]);
  });
});

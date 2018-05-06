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
      'TestingProjectController.java',
      'TestingProjectModel.java',
      'TestingProjectView.java',
      'README.TXT',
      'package.bluej'
    ]);
  });
});

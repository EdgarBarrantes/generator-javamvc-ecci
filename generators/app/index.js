'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // App name is a required argument and it's used as project
    // name and folder name to be created in the folder the user is on.
    this.option('nobluej');
  }

  initializing() {
    this.log(
      yosay(`Welcome to the brilliant ${chalk.red('generator-javamvc-ecci')} generator!`)
    );
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: "What's the name of the project?"
      },
      {
        type: 'input',
        name: 'personName',
        message: "What's your name?",
        store: true
      }
    ]).then(props => {
      this.projectName = props.projectName;
      this.personName = props.personName;
    });
  }

  Capitalize() {
    this.projectName =
      this.projectName.charAt(0).toUpperCase() + this.projectName.substr(1, 40);
    var personInfo = {
      projectName: this.projectName,
      personName: this.personName
    };
    this.config.set('personInfo', personInfo);
  }

  writing() {
    this.log(this.projectName);
    this.log(this.personName);
    this.fs.copyTpl(
      this.templatePath('controller.template'),
      this.destinationPath(this.projectName + '/' + this.projectName + 'Controller.java'),
      {
        project: this.projectName,
        personName: this.personName
      }
    );
    this.fs.copyTpl(
      this.templatePath('model.template'),
      this.destinationPath(this.projectName + '/' + this.projectName + 'Model.java'),
      {
        project: this.projectName,
        personName: this.personName
      }
    );
    this.fs.copyTpl(
      this.templatePath('view.template'),
      this.destinationPath(this.projectName + '/' + this.projectName + 'View.java'),
      {
        project: this.projectName,
        personName: this.personName
      }
    );
    this.fs.copyTpl(
      this.templatePath('README.TXT'),
      this.destinationPath(this.projectName + '/README.TXT'),
      {
        project: this.projectName,
        personName: this.personName
      }
    );
    if (!this.options.nobluej) {
      this.fs.copyTpl(
        this.templatePath('package.bluej'),
        this.destinationPath(this.projectName + '/package.bluej'),
        {
          project: this.projectName,
          personName: this.personName
        }
      );
    }
  }

  end() {
    this.config.save();
    this.log(
      yosay(
        `Cheers for using this generator! Remember to edit the readme, and actually make the quiz or what ever this is... ${chalk.red(
          'Laterz!'
        )}`
      )
    );
  }
};

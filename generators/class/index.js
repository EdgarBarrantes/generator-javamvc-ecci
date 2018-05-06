'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // App name is a required argument and it's used as project
    // name and folder name to be created in the folder the user is on.
    this.argument('className', { type: String, required: true });
  }

  initializing() {
    this.log(yosay(`'Sup? Remember you should run this inside your project folder.`));
    // Capitalizes the first letter of the class and limits it's char size to 40.
    this.options.className =
      this.options.className.charAt(0).toUpperCase() +
      this.options.className.substr(1, 40);
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'What does your class do? This goes in the description as a comment.'
      }
    ]).then(props => {
      this.description = props.description;
    });
  }

  writing() {
    var personInfo = this.config.get('personInfo');
    this.fs.copyTpl(
      this.templatePath('class.template'),
      this.destinationPath(
        personInfo.projectName + '/' + this.options.className + '.java'
      ),
      {
        className: this.options.className,
        personName: personInfo.personName,
        description: this.description
      }
    );
  }

  end() {
    this.log(
      yosay(
        `Cheers for using this generator! Good luck on your quiz or what ever this is... ${chalk.red(
          'Laterz!'
        )}`
      )
    );
  }
};

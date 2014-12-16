'use strict';
var assert = require('assert');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var cordova_lib = require('cordova-lib');
var plugman = cordova_lib.plugman;
var cordova = cordova_lib.cordova;

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cat\'s pajamas' + chalk.red('CordovaPluginDevbed') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'pluginName',
      message: 'Enter the name of the plugin.',
      default: 'CoolPlugin'
    },
    {
      type: 'input',
      name: 'pluginID',
      message: 'Enter an ID for the plugin. ex: org.bar.foo',
      default: 'org.cool.plugin'
    },
    {
      type: 'input',
      name: 'pluginVersion',
      message: 'Enter a version for the plugin. ex: 0.0.1',
      default: '0.0.1'
    },
    {
      type: 'checkbox',
      name: 'pluginPlatforms',
      message: 'Enter the platforms the plugin supports. ex: android, ios',
      choices: ['android', 'ios'],
      default: 'android'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      this.props.testbedName = this.props.pluginName + '_TestBed';

      this.props.testbedID   = this.props.pluginID   + '.testbed';
      
      done();
    }.bind(this));
  },
  
  //==========================================================================
  // Create plugin
  //--------------------------------------------------------------------------
  // Run plugman: create plugin
  //
  plugman_create: function() {
    assert(this.props.pluginName,    'pluginName is required');
    assert(this.props.pluginID,      'pluginID is required');
    assert(this.props.pluginVersion, 'pluginVersion is required');

    var done = this.async();
    
    this.log('*** Start creating plugin ***');
    plugman.create( this.props.pluginName,
                    this.props.pluginID,
                    this.props.pluginVersion,
                    '.', [],
      function(err) {
        if(err){ console.log(err); }
        else   { done(); }
      });
  },

  //-------------------------------------------------------------------------
  // Run plugman: add platform
  //
  plugman_add_platforms: function() {
    assert(this.props.pluginName,  'pluginName is required');
    
    this.log('*** Adding platform to plugin ***');
    process.chdir(this.props.pluginName);
    
    for(var idx in this.props.pluginPlatforms) {
      var platform = this.props.pluginPlatforms[idx];
      this.log(' platform: ' + platform);

      plugman.platform({ operation: 'add', platform_name: platform });
    }

    process.chdir('..');
  },

  //==========================================================================
  // Create dev bed
  //--------------------------------------------------------------------------
  // Create the simple app with cordova command
  //
  cordova_create: function() {
    assert(this.props.testbedName,  'testbedName is required');
    assert(this.props.testbedID,    'testbedID is required');

    var done = this.async();
    
    // Create TestBed application
    this.log('*** Start creating plugin test bed ***');
    var self = this;
    cordova.raw.create( this.props.testbedName, // @dir
                        this.props.testbedID,   // @id
                        this.props.testbedName, // @name
                        {} )                    // @cfg
      .done( function(){
        process.chdir(self.props.testbedName);
        done();
      } );
  },

  /// >>> CWD changed to TestBed directory >>>
  cordova_add_platform: function() {
    assert(this.props.testbedName,  'testbedName is required');    

    // Add platform
    this.log('*** Adding platform to plugin test bed ***');
    
    for(var idx in this.props.pluginPlatforms) {
      var platform = this.props.pluginPlatforms[idx];
      this.log(' platform: ' + platform);

      cordova.platform('add', platform);
    }
  },

  cordova_add_plugin: function() {
    
    // Add target plugin
    this.log('*** Adding target plugin to plugin test bed ***');
    cordova.plugin('add', '../' + this.props.pluginName);
    
  },
  
  install: function () {
/*    
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
*/
  }
});

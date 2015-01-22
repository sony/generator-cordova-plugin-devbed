'use strict';
var assert = require('assert');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var cordova_lib = require('cordova-lib');
var plugman = cordova_lib.plugman;
var cordova = cordova_lib.cordova;

//============================================================================
// CONFIGURE
//
var TEST_FRAMEWORK = 'http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git';

//============================================================================
// Yeoman generator implementation
//
module.exports = yeoman.generators.Base.extend({

  constructor: function (args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.props = options;
  },

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

      this.props.testbedName    = this.props.pluginName + '_TestBed';
      this.props.testbedID      = this.props.pluginID   + '.testbed';
      this.props.TEST_FRAMEWORK = TEST_FRAMEWORK;
      
      done();
    }.bind(this));
  },
  
  //==========================================================================
  // Create plugin
  //--------------------------------------------------------------------------
  // Run plugman: create plugin
  //
  plugin_create: function() {
    this.composeWith('cordova-plugin-devbed:_plugin', {options: this.props});
  },

  plugin_add_platforms: function() {
    this.composeWith('cordova-plugin-devbed:_plugin_platform', {options: this.props});
  },

  plugin_add_tests: function() {
    this.composeWith('cordova-plugin-devbed:_plugin_tests', {options: this.props});
  },

  //==========================================================================
  // Create dev bed
  //--------------------------------------------------------------------------
  // Create the simple app with cordova command
  //
  cordova_create: function() {
    this.composeWith('cordova-plugin-devbed:_testbed', {options: this.props});
  },

  cordova_add_platform: function() {
    this.composeWith('cordova-plugin-devbed:_testbed_platform', {options: this.props});
  },

  //--------------------------------------------------------------------------
  // Add plugin
  //
  cordova_add_plugin: function() {
    this.composeWith('cordova-plugin-devbed:_testbed_add_plugin', {options: this.props});
  },

  cordova_add_test_plugin: function() {
    this.composeWith('cordova-plugin-devbed:_testbed_add_test_plugin', {options: this.props});
  },
  
  //--------------------------------------------------------------------------
  // Add plugin test framework (org.apache.cordova.test-framework)
  //
  cordova_add_testFramework: function() {
    this.composeWith('cordova-plugin-devbed:_testbed_testframework', {options: this.props});    
  },

});

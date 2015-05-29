'use strict';
var assert = require('assert');
var Q = require('q');
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
  // Run the generator
  //
  runGenerator: function() { 
    var self = this;
    
    //------------------------------------------------------------------------
    // Run plugman: create plugin
    //
    Q.fcall( function() {
      return self._waitForComposeWith( 'cordova-plugin-devbed:_plugin',          {options: self.props});
    }).then( function() {
      return self._waitForComposeWith( 'cordova-plugin-devbed:_plugin_platform', {options: self.props});
    }).then( function() {
      return self._waitForComposeWith( 'cordova-plugin-devbed:_plugin_tests',    {options: self.props});
    })

    //------------------------------------------------------------------------
    // Create the simple app with cordova command
    //
    .then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed',           {options: self.props});
    }).then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed_platform',  {options: self.props});
    })

    //------------------------------------------------------------------------
    // Add plugin
    //
    .then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed_add_plugin',        {options: self.props});
    }).then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed_add_test_plugin', 	{options: self.props});
    })
  
    //------------------------------------------------------------------------
    // Add plugin test framework (org.apache.cordova.test-framework)
    //
    .then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed_testframework',   {options: self.props});
    });    
  },

  //===========================================================================
  // Utility functions for this generator
  //===========================================================================
  //---------------------------------------------------------------------------
  // Deferred object wrapper for composeWith
  //
  _waitForComposeWith: function( namespace, opt, settings ){

    var df = Q.defer();
    var done = function () {
      df.resolve();
    };

    opt.options = opt.options || {};
    opt.options.done = done;

    this.composeWith(namespace, opt, settings);

    return df.promise;
  },

});

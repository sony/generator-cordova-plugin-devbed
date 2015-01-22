'use strict';
var assert = require('assert');
var yeoman = require('yeoman-generator');
var cordova_lib = require('cordova-lib');
var cordova = cordova_lib.cordova;

//============================================================================
// Yeoman generator implementation
//
module.exports = yeoman.generators.Base.extend({

  constructor: function (args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.props = options;
  },

  //==========================================================================
  // Add platform into testbed
  //--------------------------------------------------------------------------
  /// CWD changed to TestBed directory
  ///
  cordova_changedir: function() {
    assert(this.props.testbedName,  'testbedName is required');
    process.chdir(this.props.testbedName);
  },

  //--------------------------------------------------------------------------
  // Add plugin
  //
  cordova_add_platform: function() {
    assert(this.props.TEST_FRAMEWORK, 'TEST_FRAMEWORK is required');
    this.log('*** Adding test framework for cordova plugin ***');
    
    cordova.plugin('add', this.props.TEST_FRAMEWORK);
  },

  testbed_back_to_root: function() {
    process.chdir('..');
  }
  
});

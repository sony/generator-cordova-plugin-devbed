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
  // Add platform
  //
  cordova_add_platforms: function() {
    this.log('*** Adding platform to plugin test bed ***');

    var done = this.async();
    this._add_platforms(0, this.props.pluginPlatforms, done);
  },

  _add_platforms: function(idx, platforms, done) {

    if(platforms.length <= idx) {
      done();
      return;
    }
    
    var self = this;
    cordova.platform('add', platforms[idx], function() {
      self._add_platforms(idx+1, platforms, done);
    });
  },

  cordova_back_to_root: function() {
    process.chdir('..');
  },
  
});

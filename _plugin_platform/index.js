'use strict';
var assert = require('assert');
var yeoman = require('yeoman-generator');
var cordova_lib = require('cordova-lib');
var plugman = cordova_lib.plugman;

//============================================================================
// Yeoman generator implementation
//
module.exports = yeoman.generators.Base.extend({

  constructor: function (args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.props = options;
  },

  //==========================================================================
  // Add platform into plugin
  //--------------------------------------------------------------------------
  /// CWD changed to plugin directory
  ///
  plugin_changedir: function() {
    assert(this.props.pluginName,  'pluginName is required');
    process.chdir(this.props.pluginName);
  },
  
  //-------------------------------------------------------------------------
  // Run plugman: add platform
  //
  plugin_add_platforms: function() {
    this.log('*** Adding platform to plugin ***');
    
    var done = this.async();
    this._add_platforms(0, this.props.pluginPlatforms, done);
  },

  _add_platforms: function(idx, platforms, done) {

    if(platforms.length <= idx) {
      done();
      return;
    }
    
    var self = this;
    plugman.platform({ operation: 'add', platform_name: platforms[idx] }, function() {
      self._add_platforms(idx+1, platforms, done);
    });
  },

  plugin_back_to_root: function() {
    process.chdir('..');
  }
  
});

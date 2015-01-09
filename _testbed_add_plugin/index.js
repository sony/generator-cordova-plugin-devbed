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

    this.on('end', function(){
      process.chdir('..');
    });
  },
  
  //--------------------------------------------------------------------------
  // Add plugin
  //
  cordova_add_platform: function() {
    assert(this.props.pluginName,  'pluginName is required');    
    this.log('*** Adding target plugin to plugin test bed ***');

    var done = this.async();
    var plugins = [this.props.pluginName];
    this._add_plugins(0, plugins, done);
  },

  _add_plugins: function(idx, plugins, done) {

    if(plugins.length <= idx) {
      done();
      return;
    }
    
    var self = this;
    cordova.plugin('add', '../' + plugins[idx], function() {
      self._add_plugins(idx+1, plugins, done);
    });
  }

  
});

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
  // Create plugin
  //--------------------------------------------------------------------------
  // Run plugman: create plugin
  //
  plugin_create: function() {
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

});

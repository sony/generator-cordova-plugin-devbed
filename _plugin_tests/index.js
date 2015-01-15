'use strict';
var assert = require('assert');
var yeoman = require('yeoman-generator');

//============================================================================
// Yeoman generator implementation
//
module.exports = yeoman.generators.Base.extend({

  constructor: function (args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.props = options;
  },

  //==========================================================================
  // Create test plugin
  //--------------------------------------------------------------------------  
  /// CWD changed to plugin directory
  ///
  plugin_changedir: function() {
    assert(this.props.pluginName,  'pluginName is required');
    process.chdir(this.props.pluginName);
  },
  
  //--------------------------------------------------------------------------
  // Run plugman: create plugin
  //
  plugin_create_tests: function() {
    assert(this.props.pluginName,    'pluginName is required');
    assert(this.props.pluginID,      'pluginID is required');
    assert(this.props.pluginVersion, 'pluginVersion is required');

    var done = this.async();
    
    this.log('*** Start creating plugin tests ***');

    this.template('_plugin.xml', 'tests/plugin.xml', this.props);
    this.template('_tests.js', 'tests/tests.js', this.props);

    done();
  },

  plugin_back_to_root: function() {
    process.chdir('..');
  }

});

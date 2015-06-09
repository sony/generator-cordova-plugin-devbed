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
  // Add package.json into plugin
  //--------------------------------------------------------------------------
  /// CWD changed to plugin directory
  ///
  plugin_changedir: function() {
    assert(this.props.pluginName,  'pluginName is required');
    process.chdir(this.props.pluginName);
  },

  //-------------------------------------------------------------------------
  // Run plugman: add package.json
  //
  plugin_add_packagejson: function() {
    assert(this.props.pluginName,    'pluginName is required');
    assert(this.props.pluginID,      'pluginID is required');
    assert(this.props.pluginVersion, 'pluginVersion is required');

    var done = this.async();
    
    this.log('*** Adding package.json to plugin ***');

    this.template('_package.json', 'package.json', this.props);

    this.fs.commit(function(){ done(); });
/**
 *  First, I thought I can use plugman for creating package.json.
 *  But the 'plugman createpackagejson' does not handle async behavior as I expected.
 *  And they does not carry 'name' property into package.json from plugin.xml.
 *  I changed my mind to use template 
 * 
    var done = this.async();
    plugman.createpackagejson('.', function(){
	    console.log("End of adding package.json");
	    done();
	  });
*/    
  },

  plugin_back_to_root: function() {
    process.chdir('..');
  },

  // finalize this generator
  finalize: function() {
    if( this.props.done ){ this.props.done(); }  
  },  
  
});

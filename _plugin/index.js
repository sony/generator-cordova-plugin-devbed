var assert = require('assert');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var xml2js = require('xml2js');
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

  // Modify the plugin.xml created by plugman
  modify_plugin_xml: function() {
    assert(this.props.pluginName,    'pluginName is required');
    assert(this.props.pluginID,      'pluginID is required');

    var done = this.async();
    var parser = new xml2js.Parser();
    var builder = new xml2js.Builder();

    var plugin_name = this.props.pluginName;
    var plugin_id   = this.props.pluginID;
    var plugin_file = this.props.pluginName + '/plugin.xml';
    
    var data = fs.readFileSync(plugin_file);
    parser.parseString(data, function(err, result) {
      
      result = this._replace_clobbers( result, plugin_name, plugin_id );

      var xml = builder.buildObject(result);
      fs.writeFileSync(plugin_file, xml);
      
      done();
    }.bind(this));
  },

  // replace <plugin><js-module><clobbers @target> value
  _replace_clobbers: function( obj, pluginName, pluginID ){

    // It's not correct way of parsing/replacing
    //  Strictly speeing, it should check existence and to know
    // it's object or array 
    obj.plugin['js-module'][0].clobbers[0].$.target = pluginID;
    
    return obj;
  },
  
});

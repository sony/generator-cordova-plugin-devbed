'use strict';
var assert = require('assert');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var xml2js = require('xml2js');
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
  changedir: function() {
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

  modify_config_xml: function() {
    var done = this.async();
    var parser = new xml2js.Parser();
    var builder = new xml2js.Builder();

    var data = fs.readFileSync('config.xml');
    parser.parseString(data, function(err, result) {
      
      result.widget.content[0].$.src = "cdvtests/index.html";
      var xml = builder.buildObject(result);
      fs.writeFileSync('config.xml', xml);
      
      done();
    });
  },
  
  back_to_root: function() {
    process.chdir('..');
  }
  
});

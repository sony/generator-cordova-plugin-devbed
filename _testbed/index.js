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
  // Create dev bed
  //--------------------------------------------------------------------------
  // Create the simple app with cordova command
  //
  cordova_create: function() {
    assert(this.props.testbedName,    'testbedName is required');
    assert(this.props.domainName,     'domainName is required');

    var done = this.async();
    var testbedID = this._makeReverseDomain( this.props.domainName, this.props.testbedName );
    
    // Create TestBed application
    this.log('*** Start creating plugin test bed ***');
    cordova.raw.create( this.props.testbedName, // @dir
                        testbedID,              // @id
                        this.props.testbedName, // @name
                        {} )                    // @cfg
      .done( function(){
        done();
      } );
  },
  
  // finalize this generator
  finalize: function() {
    if( this.props.done ){ this.props.done(); }  
  },

  _makeReverseDomain: function( domain, name ){
    var aryDomain = domain.split('.');
    aryDomain.reverse();
    return aryDomain.join('.') + '.' + name;  	  
  },

});

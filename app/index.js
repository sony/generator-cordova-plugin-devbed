'use strict';
var assert = require('assert');
var Q = require('q');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var cordova_lib = require('cordova-lib');
var plugman = cordova_lib.plugman;
var cordova = cordova_lib.cordova;

//============================================================================
// CONFIGURE
//
var TEST_FRAMEWORK = 'http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git';

//============================================================================
// Yeoman generator implementation
//
module.exports = yeoman.generators.Base.extend({

  constructor: function (args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.props = options;
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  //===========================================================================
  // Prompting
  //---------------------------------------------------------------------------
  // Input project settings
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cat\'s pajamas ' + chalk.red('CordovaPluginDevbed') + ' generator!'
    ));

    var self = this;
    self._promptPluginName()
    .then( function(){ return self._promptDomainName();      } )
    .then( function(){ return self._promptPluginID();        } )
    .then( function(){ return self._promptPluginVersion();   } )
    .then( function(){ return self._promptPluginPlatforms(); } )
    .then( function(){
      // remaining adjustments
      self.props.testbedName    = self.props.pluginName + '_TestBed';
      self.props.testbedID      = self.props.pluginID   + '-testbed';
      self.props.TEST_FRAMEWORK = TEST_FRAMEWORK;      
      
      done();
    });   
  },
   
  //--------------------------------------------------------------------------
  // pluginName
  //
  _promptPluginName: function() {
    var self = this;
    return Q.Promise( function(resolve, reject, notify ){
      var prompts = [{
        type: 'input',
        name: 'pluginName',
        message: 'Enter the name of the plugin.',
        default: 'CoolPlugin'
      }];

      self.prompt(prompts, function (answers) {
        self.props.pluginName = answers.pluginName;
        resolve();
      });
    });
  },

  //--------------------------------------------------------------------------
  // domainName
  //
  _promptDomainName: function() {
    var self = this;
    return Q.Promise( function(resolve, reject, notify ){
      var prompts = [{
        type: 'input',
        name: 'domainName',
        message: 'Enter the domain name of your company/organization.',
        default: 'cool.org'
      }];

      self.prompt(prompts, function (answers) {
        self.props.domainName = answers.domainName;
        resolve();
      });
    });    
  },
  
  //--------------------------------------------------------------------------
  // pluginID
  //
  _promptPluginID: function() {
    var self = this;
    return Q.Promise(function (resolve, reject, notify) {
//    var org = self._pickOrganizationName( self.props.domainName ).toLowerCase();
      var revDomain = self._createReverseDomain( self.props.domainName ).toLowerCase();
      var name = self.props.pluginName.toLowerCase();
      
      var prompts = [{
        type: 'input',
        name: 'pluginID',
        message: 'Enter an ID for the plugin',
//      default: (org && name) ? 'cordova-plugin-' + org + '-' + name : 'cordova-plugin-org-coolplugin',
        default: (revDomain && name) ? revDomain + '.' + name : 'org.cool.coolplugin',
      }];

      self.prompt(prompts, function (answers) {
        self.props.pluginID = answers.pluginID;
        var organization = self._createHyphenizedReverseOrganizationName( self.props.domainName ).toLowerCase();
        self.props.packageID = 'cordova-plugin-' + organization + '-' + name;
        resolve();
      });
    });
  },
    
  //--------------------------------------------------------------------------
  // pluginVersion
  //
  _promptPluginVersion: function() {
    var self = this;
    return Q.Promise(function (resolve, reject, notify) {
     var prompts = [{
       type: 'input',
       name: 'pluginVersion',
       message: 'Enter a version for the plugin. ex: 0.0.1',
       default: '0.0.1'
      }];

      self.prompt(prompts, function (answers) {
        self.props.pluginVersion = answers.pluginVersion;
        resolve();
      });
    });
  },    

  //--------------------------------------------------------------------------
  // pluginPlatforms
  //
  _promptPluginPlatforms: function() {
    var self = this;
    return Q.Promise(function (resolve, reject, notify) {
     var prompts = [{
       type: 'checkbox',
       name: 'pluginPlatforms',
       message: 'Enter the platforms the plugin supports. ex: android, ios',
       choices: ['android', 'ios'],
       default: 'android'
      }];

      self.prompt(prompts, function (answers) {
        self.props.pluginPlatforms = answers.pluginPlatforms;
        resolve();
      });
    });
  },  

  //==========================================================================
  // Run the generator
  //
  runGenerator: function() { 
    var self = this;
    
    //------------------------------------------------------------------------
    // Run plugman: create plugin
    //
    Q.fcall( function() {
      return self._waitForComposeWith( 'cordova-plugin-devbed:_plugin',          {options: self.props});
    }).then( function() {
      return self._waitForComposeWith( 'cordova-plugin-devbed:_plugin_platform', {options: self.props});
    }).then( function() {
      return self._waitForComposeWith( 'cordova-plugin-devbed:_plugin_packagejson', {options: self.props});
    }).then( function() {
      return self._waitForComposeWith( 'cordova-plugin-devbed:_plugin_tests',    {options: self.props});
    })

    //------------------------------------------------------------------------
    // Create the simple app with cordova command
    //
    .then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed',           {options: self.props});
    }).then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed_platform',  {options: self.props});
    })

    //------------------------------------------------------------------------
    // Add plugin
    //
    .then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed_add_plugin',        {options: self.props});
    }).then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed_add_test_plugin', 	{options: self.props});
    })
  
    //------------------------------------------------------------------------
    // Add plugin test framework (org.apache.cordova.test-framework)
    //
    .then( function() {
      return self._waitForComposeWith('cordova-plugin-devbed:_testbed_testframework',   {options: self.props});
    });    
  },

  //===========================================================================
  // Utility functions for this generator
  //===========================================================================
  //---------------------------------------------------------------------------
  // Deferred object wrapper for composeWith
  //
  _waitForComposeWith: function( namespace, opt, settings ){
    var df = Q.defer();
    var done = function () {
      df.resolve();
    };

    opt.options = opt.options || {};
    opt.options.done = done;

    this.composeWith(namespace, opt, settings);

    return df.promise;
  },

  //---------------------------------------------------------------------------
  // Pickup the company/organization name from domain name
  //
  // cool.org -> cool
  // dev.plugin.cool.org -> cool-plugin-dev
  _createHyphenizedReverseOrganizationName: function( domainName ) {
    if(! domainName ) { return 'org'; }   // Quick return
    var aryDomain = domainName.split('.')
    aryDomain.reverse().shift();
    return aryDomain.join('-');  
  },

  // cool.org -> org.cool
  // dev.plugin.cool.org -> org.cool.plugin.dev
  _createReverseDomain: function( domainName ) {
    return domainName ? domainName.split('.').reverse().join('.') : 'org';  
  },


});

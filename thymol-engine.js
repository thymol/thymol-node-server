var debug = require( "debug" )( "express:thymolEngine" );
var express = require( "express" );
var logger = require( "morgan" );
var cookieParser = require( "cookie-parser" );
var bodyParser = require( "body-parser" );

var templates = require( "./routes/templates" );
var thymolEngine = express();

var serverConfiguration = require( "./config/server-config" );
thymolEngine.set( "templateRoot", serverConfiguration.templateRoot );
thymolEngine.set( "templatePath", serverConfiguration.templatePath );
thymolEngine.set( "templateOffset", serverConfiguration.templateOffset );

thymolEngine.use( logger( "dev" ) );
thymolEngine.use( bodyParser.json() );
thymolEngine.use( bodyParser.urlencoded( {
  extended : false
} ) );
thymolEngine.use( cookieParser() );

thymolEngine.use( templates );

var fs = require( "fs" );

var jsdl = require( "jsdom" );
var jsdom = jsdl.jsdom;

//var xhreq = require( "xmlhttprequest" );
//XMLHttpRequest = xhreq.XMLHttpRequest;

require( "./lib/XHR");

thymol = {};

setDefaults = function() {
  thymol.thDebug = serverConfiguration.debug;
  thymol.thDefaultPrefix = serverConfiguration.defaults.prefix;
  thymol.thDefaultDataPrefix = serverConfiguration.defaults.dataPrefix;
  thymol.thDefaultPrecision = serverConfiguration.defaults.precision;
  thymol.thDefaultProtocol = serverConfiguration.defaults.protocol;
  thymol.thDefaultLocale = serverConfiguration.defaults.locale;
  thymol.thDefaultPrecedence = serverConfiguration.defaults.precedence;
  thymol.thDefaultMessagePath = serverConfiguration.defaults.messagePath;
  thymol.thDefaultMessagesBaseName = serverConfiguration.defaults.messagesBaseName;
  thymol.thDefaultRelativeRootPath = serverConfiguration.defaults.relativeRootPath;
  thymol.thDefaultExtendedMapping = serverConfiguration.defaults.extendedMapping;
  thymol.thDefaultLocalMessages = serverConfiguration.defaults.localMessages;
  thymol.thDefaultDisableMessages = serverConfiguration.defaults.disableMessages;
  thymol.thDefaultTemplateSuffix = serverConfiguration.defaults.templateSuffix;
};
require( serverConfiguration.thymolNode );
thymol.thDomParser = function() {
};
thymol.thDomParser.prototype = {};
thymol.thDomParser.prototype.constructor = thymol.thDomParser;
thymol.thDomParser.prototype.parseFromString = function( markup, type ) {
  var jsdomOptions = {
    features : {
      FetchExternalResources : false,
      ProcessExternalResources : false
    }
  };
  return jsdom( markup, jsdomOptions );
};

thymol.ready = function( func ) {
  if( typeof thymolDeferredFunctions === "undefined" || thymolDeferredFunctions === null ) {
    thymolDeferredFunctions = [];
  }
  thymolDeferredFunctions.push( func );
};

thymolEngine.engine( "html", function( filePath, options, callback ) { // define the template engine
  fs.readFile( filePath, function( err, content ) {
    if( err ) {
      throw new Error(err);
    }
    var strContent = content.toString();
    var result = thymolProcess( strContent, options );
    return callback( result.error, result.rendered );
  } )
} );

thymolEngine.set( "views", serverConfiguration.templateRoot + serverConfiguration.templatePath );
thymolEngine.set( "view engine", "html" );

// catch 404 and forward to error handler
thymolEngine.use( function( req, res, next ) {
  var err = new Error( "Not Found" );
  err.status = 404;
  next( err );
} );

// error handlers

// development error handler
// will print stack trace
if( thymolEngine.get( "env" ) === "development" ) {
  thymolEngine.use( function( err, req, res, next ) {
    if( notFavicon( req, res ) ) {
      res.status( err.status || 500 );
      res.render( "error", {
        message : err.message,
        error : err
      } );
    }
  } );
}

// production error handler
// no stack traces leaked to user
thymolEngine.use( function( err, req, res, next ) {
  if( notFavicon( req, res ) ) {
    res.status( err.status || 500 );
    res.render( "error", {
      message : err.message,
      error : {}
    } );
  }
} );

var notFavicon = function( req, res ) {
  if( req.originalUrl.length === 12 ) {
    if( "/favicon.ico" === req.originalUrl.toLowerCase() ) {
      return false;
    }
  }
  return true;
}

var thymolProcess = function( content, options ) {

  thPrefix = undefined;
  thDataPrefix = undefined;
  thAllowNullText = undefined;
  thPrecision = undefined;
  thProtocol = undefined;
  thLocale = undefined;
  thPrecedence = undefined;
  thMessagePath = undefined;
  thMessagesBaseName = undefined;
  thRelativeRootPath = undefined;
  thExtendedMapping = undefined;
  thLocalMessages = undefined;
  thDisableMessages = undefined;
  thTemplateSuffix = undefined;

  thRoot = undefined;
  thPath = undefined;
  thVars = undefined;
  thMessages = undefined;
  thMappings = undefined;
  thDisable = undefined;

  var templateURL = "file://" + options.uri;

  var jsdomOptions = {
    features : {
      FetchExternalResources : false,
      ProcessExternalResources : false
    },
    url : templateURL
  };

  var document = jsdom( content, jsdomOptions );

  thymol.thDocument = document;
  thymol.thWindow = document.parentWindow;

  thymol.thWindow.location.search = "?";

  setDefaults();

  thymol.thProtocol = "";

  thymol.thRoot = serverConfiguration.templateRoot;
  var offset = thymolEngine.get( "templateOffset" );
  thymol.thPath = serverConfiguration.templatePath + offset;

  thymol.thUseAbsolutePath = true;
  thymol.thKeepRelative = true;

  $ = require( "jquery" )( thymol.thWindow );

  thymol.thTop = {
    name : new String()
  };

  thymol.jqSetup( $ );

  thymol.thRequest = options.query;

  var result = {
    error : null
  };

  var alertObject = {};
  alertObject.alert = function( arg ) {
    result.error = arg;
  };

  thymol.thWindow.alert = alertObject.alert;

  if( !!options.error ) {
    thVars = [ [ "errorMessage", options.error ] ];
  }

  var resultDocument = thymol.execute( thymol.thDocument );

  var serialiser = jsdl.serializeDocument;

  result.rendered = serialiser( resultDocument );

  return result;
};

module.exports = thymolEngine;

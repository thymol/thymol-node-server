var debug = require( "debug" )( "express:thymolEngine" );
var express = require( "express" );
var logger = require( "morgan" );
var cookieParser = require( "cookie-parser" );
var bodyParser = require( "body-parser" );

var templates = require( "./routes/templates" );
var thymolEngine = express();

var thymolNodePath = "thymol-node";

var argv = require('yargs').argv;

var serverConfiguration = require( "./config/server-config" );
if( !!argv.c ) {
  serverConfiguration = require( argv.c );
}

if( argv._.length > 0) {
  serverConfiguration.webappRoot = argv._[0];
}
if( argv._.length > 1) {
  serverConfiguration.templatePath = argv._[1];
}
console.log("template root is: " + serverConfiguration.webappRoot );
console.log("template path is: " + serverConfiguration.templatePath );
if( argv._.length > 2) {
  if( !!argv._[2] && argv._[2].length > 0 ) {
    thymolNodePath = argv._[2];
    console.log("thymol-node path is: " + thymolNodePath );
  }
}

serverConfiguration.host = serverConfiguration.host || "0.0.0.0";
serverConfiguration.port = serverConfiguration.port || 3000;

thymolEngine.set( "config", serverConfiguration );

thymolEngine.use( logger( "dev" ) );
thymolEngine.use( bodyParser.json() );
thymolEngine.use( bodyParser.urlencoded( {
  extended : false
} ) );
thymolEngine.use( cookieParser() );

var fs = require( "fs" );

var jsdl = require( "jsdom" );
var jsdom = jsdl.jsdom;

//var xhreq = require( "xmlhttprequest" );
//XMLHttpRequest = xhreq.XMLHttpRequest;

require( "./lib/XHR");

thymol = {};

setDefaults = function() {
  thymol.thScriptPath = "";
  thymol.thDebug = serverConfiguration.debug;
  thymol.thDefaultPrefix = serverConfiguration.defaults.prefix;
  thymol.thDefaultDataPrefix = serverConfiguration.defaults.dataPrefix;
  thymol.thDefaultPrecision = serverConfiguration.defaults.precision;
  thymol.thDefaultProtocol = serverConfiguration.defaults.protocol;
  thymol.thDefaultLocale = serverConfiguration.defaults.locale;
  thymol.thDefaultPrecedence = serverConfiguration.defaults.precedence;
  thymol.thDefaultMessagePath = serverConfiguration.defaults.messagePath;
  thymol.thDefaultResourcePath = serverConfiguration.defaults.resourcePath;
  thymol.thDefaultMessagesBaseName = serverConfiguration.defaults.messagesBaseName;
  thymol.thDefaultRelativeRootPath = serverConfiguration.defaults.relativeRootPath;
  thymol.thDefaultExtendedMapping = serverConfiguration.defaults.extendedMapping;
  thymol.thDefaultLocalMessages = serverConfiguration.defaults.localMessages;
  thymol.thDefaultDisableMessages = serverConfiguration.defaults.disableMessages;
  thymol.thDefaultTemplateSuffix = serverConfiguration.defaults.templateSuffix;
};

resetGlobals = function() {
  thPrefix = undefined;
  thDataPrefix = undefined;
  thAllowNullText = undefined;
  thPrecision = undefined;
  thProtocol = undefined;
  thLocale = undefined;
  thPrecedence = undefined;
  thMessagePath = undefined;
  thResourcePath = undefined;
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
};

loadJQuery = function() {
  $ = require( "jquery" )( thymol.thWindow );
  if( !!serverConfiguration ) {
    if( !!serverConfiguration.jQueryConfiguration ) {
      for( var prop in serverConfiguration.jQueryConfiguration ) {
        if( serverConfiguration.jQueryConfiguration.hasOwnProperty(prop)  ) {
          if( $.hasOwnProperty(prop)  ) {
            var sjcProp = serverConfiguration.jQueryConfiguration[prop];
            for( var innerProp in sjcProp ) {
              if( sjcProp.hasOwnProperty(innerProp)  ) {
                if( $[prop].hasOwnProperty(innerProp)  ) {
                  $[prop][innerProp] = sjcProp[innerProp];
                }
              }
            }
          }
        }
      }
    }
  }
}

require( thymolNodePath );
thymol.express = express;
thymol.engine = thymolEngine;
thymol.require = require;
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

resetGlobals();
setDefaults();

var jsdomOptions = {
  features : {
    FetchExternalResources : false,
    ProcessExternalResources : false
  }
};

var doc = jsdom("<html></html>", jsdomOptions);
thymol.thWindow = doc.defaultView;
loadJQuery();
thymol.jqSetup( $ );
thymol.setup( serverConfiguration.resetPerRequest );

thymol.thProtocol = "";

thymol.thRoot = serverConfiguration.webappRoot;

thymol.thUseAbsolutePath = true;
thymol.thUseFullURLPath = false;

if( !!argv.w ) {
  require( argv.w )(thymolEngine,express);
}

thymolEngine.use( templates );
thymolEngine.use(express.static( serverConfiguration.webappRoot ));

thymolEngine.set( "views", [serverConfiguration.webappRoot + serverConfiguration.templatePath, __dirname + "/default" ] );

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
      try {
        res.render( "error", {
          message : err.message,
          error : err
        } );
      }
      catch(drnderr) {
        debug("drnderr is:" + drnderr);
      }
    }
  } );
}

// production error handler
// no stack traces leaked to user
thymolEngine.use( function( err, req, res, next ) {
  if( notFavicon( req, res ) ) {
    res.status( err.status || 500 );
    try {
      res.render( "error", {
        message : err.message,
        error : {}
      } );
    }
    catch(rnderr) {
      debug("rnderr is:" + rnderr);
    }
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

  jsdomOptions.url = "file://" + options.uri;

  var document = jsdom( content, jsdomOptions );

  thymol.thDocument = document;
  thymol.thWindow = document.parentWindow;

  thymol.thWindow.location.search = "?";
  thymol.thWindow.XMLHttpRequest = XMLHttpRequest;

  setDefaults();

  thymol.thPath = serverConfiguration.templatePath + options.offset;

  thymol.thDataThymolLoading = serverConfiguration.dataThymolLoading || false;

  loadJQuery();
  thymol.jqSetup( $ );


  thymol.thTop = {
    name : new String()
  };

  thymol.thRequest = options.query;

  var result = {
    error : null
  };

  var alertObject = {};
  alertObject.alert = function( arg ) {
    result.error = arg;
  };

  thymol.thWindow.alert = alertObject.alert;

  if( !!serverConfiguration.resetPerRequest ) {
    resetGlobals();
    thymol.reset();
  }

  if( !!options.error ) {
    thVars = [ [ "errorMessage", (!!options.error.status ? (options.error.status + " "): "" )  + (!!options.error.name ? (options.error.name + ": "): "" ) + (!!options.error.message ? options.error.message: options.error ) ] ];
  }

  var resultDocument = thymol.execute( thymol.thDocument );

  var serialiser = jsdl.serializeDocument;

  result.rendered = serialiser( resultDocument );

  return result;
};

module.exports = thymolEngine;
var express = require( 'express' );
var router = express.Router();
var fs = require( 'fs' );

/* GET a template or forward request to next route. */
router.get( '*', function( req, res ) {
  var l = req.originalUrl.length;
  if( l > 1 ) {
    try {
      var templateRoot = req.app.get( "templateRoot" );
      var templatePath = req.app.get( "templatePath" );
      var query = null;
      var splits = req.originalUrl.split( "?" );
      var url = splits[ 0 ];
      if( url.lastIndexOf( ".html" ) !== url.length - 5 ) {
        url = splits[ 0 ] + ".html";
      }
      var tf = templateRoot + templatePath + url;
      if( splits.length > 1 ) {
        query = "?" + splits[ 1 ];
      }
      var stats = fs.statSync( tf );
      if( !!stats && stats.isFile() ) {
        var path = url.substring( 1 );
        var lio = url.lastIndexOf( "/" );
        if( lio > 0 ) {
          var offset = url.substring( 0, lio );
          req.app.set( "templateOffset", offset );
        }
        var options = {};
        options.query = query;
        options.uri = tf;
        res.render( path, options );
        return;
      }
    }
    catch( err ) {
    }
  }
  next();
} );

module.exports = router;

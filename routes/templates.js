var express = require( 'express' );
var router = express.Router();
var fs = require( 'fs' );

/* GET a template or forward request to next route. */
router.get( '*', function( req, res, next ) {
  var l = req.originalUrl.length;
  if( l > 1 ) {
    try {
      var config = req.app.get( "config" );
      var query = null;
      var splits = req.originalUrl.split( "?" );
      var url = splits[ 0 ];
      if( url.lastIndexOf( ".html" ) !== url.length - 5 ) {
        url = splits[ 0 ] + ".html";
      }
      var tf = config.templateRoot + config.templatePath + url;
      if( splits.length > 1 ) {
        query = "?" + splits[ 1 ];
      }
      var stats = fs.statSync( tf );
      if( !!stats && stats.isFile() ) {
        var path = url.substring( 1 );
        var lio = url.lastIndexOf( "/" );
        var offset = "";
        if( lio > 0 ) {
          offset = url.substring( 0, lio );
        }
        var options = {};
        options.query = query;
        options.uri = tf;
        options.offset = offset;
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

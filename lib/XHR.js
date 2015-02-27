var XHR = require( "xmlhttprequest" );

var BaseXHR = XHR.XMLHttpRequest;

// Overriding the official release to work around defect #27

XMLHttpRequest = function() {
  BaseXHR.call( this );
  this.getAllResponseHeaders = function() {
    return "";
  };
}

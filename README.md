Thymol Node Server
==================

A nodejs based server-side JavaScript Thymeleaf template engine built on Thymol and Express.

This is an experimental web server that processes server-side [Thymeleaf](http://www.thymeleaf.org) templates and [Thymol](http://www.thymoljs.org) JavaScript data files returning documents rendered as HTML.

Pre-Requisites
--------------

You will need [nodejs](http://nodejs.org/download/) and npm (node comes with npm now).
This project depends on the Thymol Node module see [npmjs](https://www.npmjs.com/package/thymol-node) and [github](https://github.com/thymol/thymol-node).

Installation
------------

 Either "npm install thymol-node-server -g"

 Or clone the project from [github](https://github.com/thymol/thymol-node-server) and "npm install" it (locally).

Configuration
-------------

 There is a single configuration file config/server-config.js.
 You can set various control parameters using this file [(see)](http://www.thymoljs.org/documents/configuration.html?docu).

 Also, you can fine tune the jQuery configuration using the jQueryConfiguration initialiser (properties of this object are set on jQuery instances).

For example using:
 <code>
jQueryConfiguration: {
    support: {
      cors: true
    }
}
</code>
 Will set the "support.cors" property of jQuery instances to "true" (you may need to do this if you're using jQuery 1.x.x).

Execution
---------
 If you globally installed with npm all you need to do is:

    thymol <absolute-path-to-webapp-root> [<relative-path-to-templates>]

 If you're using a git clone:

   Then on *nix simply run:

     bin/thymol-server <absolute-path-to-webapp-root> [<relative-path-to-templates>]

 On Windows run this file using the nodejs node command:

    node bin/thymol-server <absolute-path-to-webapp-root> [<relative-path-to-templates>]

 Where:

   "&lt;absolute-path-to-webapp-root&gt;" identifies the base directory of your web application (the webapp root directory).

   "[&lt;relative-path-to-templates&gt;]" is the (optional) relative path from the webapp root directory to the template directory.

 References to resource files should be relative to the webapp root directory.

Operation
---------

  The thymol-server will process templates rooted at the specified <i>absolute-path-to-webapp-root</i> value.
  
  The server follows the same syntax and applies the same rules as client-side Thymol ([see](http://www.thymoljs.org/)) with the exception that only JavaScript files specified by the "data-thymol-load" script tag attribute will be loaded and executed.
  
  Any JavaScript file defined by a correctly formed "data-thymol-load" attribute in a script tag will be loaded and executed even if those script tags don't have a value for the "src" attribute.

  If the template contains a script tag that would load thymol.js when processed by client-side Thymol, this is ignored by the server. However, if the same script tag defines scripts using the "data-thymol-load" attribute, then those scripts will be loaded and executed.

Examples
--------

The following 2 examples illustrate some familiar static demonstration cases.  

a). Download the [2.X-master branch from thymol.js](https://github.com/thymol/thymol.js/archive/2.x-master.zip) and start the server with the sourceforge/Webcontent sub-directory as the webapp root directory:

    thymol <installation-path>/thymol/sourceforge/Webcontent
   
Then browse to http://localhost:3000/examples. Most of these examples should work correctly with the exception of "billS", "say hello (split)" and "session" that depend on client-side only features.

b). Clone the [Thymol petclinic example project](https://github.com/thymol/thymol.thymeleafexamples-petclinic) and start the server with the src/main/webapp sub-directory as the webapp root directory and "/WEB-INF/thymeleaf" as the template path:

    thymol <installation-path>/thymol.thymeleafexamples-petclinic/src/main/webapp /WEB-INF/thymeleaf
  
 Then browse to http://localhost:3000/welcome.


Issues/Support
--------------

 For bug reports/enhancement requests use the issues link [here](https://github.com/thymol/thymol-node-server/issues).
 
 For support or further information, please post a question on the [Thymol users forum](http://forum.thymoljs.org/).

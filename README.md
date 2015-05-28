Thymol Node Server
==================

A nodejs based server-side JavaScript Thymeleaf template engine built on Thymol and Express.

This is an experimental web server that processes server-side [Thymeleaf](http://www.thymeleaf.org) templates, JavaScript and data using [Thymol](http://www.thymoljs.org) and returns documents rendered as HTML.

Pre-Requisites
--------------

You will need [nodejs](http://nodejs.org/download/) and npm (node comes with npm now).
This project depends on the Thymol Node module see [npmjs](https://www.npmjs.com/package/thymol-node) and [github](https://github.com/thymol/thymol-node).

Installation
------------

 Either "npm install thymol-node-server -g"

 Or clone the project from [github](https://github.com/thymol/thymol-node-server) and "npm install" it (locally).

Execution
---------
 If you globally installed with npm all you need to do is:

    thymol [-w <path-to-webapp-script>] [-c <path-to-config-file>] <path-to-webapp-root> [<relative-path-to-templates>]

 If you're using a git clone:

   Then on *nix simply run:

     bin/thymol-server [-w <path-to-webapp-script>] [-c <path-to-config-file>] <path-to-webapp-root> [<relative-path-to-templates>]

 On Windows run this file using the nodejs node command:

    node bin/thymol-server [-w <path-to-webapp-script>] [-c <path-to-config-file>] <path-to-webapp-root> [<relative-path-to-templates>]

 Where:

   "&lt;path-to-webapp-script&gt;" is the (optional) path locating the script that loads and intialises the web application code.

   "&lt;path-to-config-file&gt;" is the (optional) path locating the configuration file (see below).

   "&lt;path-to-webapp-root&gt;" identifies the base directory of your web application (the webapp root directory).

   "[&lt;relative-path-to-templates&gt;]" is the (optional) relative path from the webapp root directory to the template directory.

 References to resource files should be relative to the webapp root directory.

Configuration
-------------

 Thymol Node Server is configured using a simple JavaScript file. A standard configuration file is supplied in the default installation at "config/server-config.js".
 
 To apply specific configuration changes you may edit this file or nominate an alternative configuration file using the "-c <path-to-config-file>" option on the server start-up command line.
  
 You can set the values of Thymol control parameters using this file [(see)](http://www.thymoljs.org/documents/configuration.html?docu) or you can set various server control parameters (server host name, port etc).

 Fixed values for webapp root and template path can be specified in the configuration file so that they need not be set on the command line.
  
 Thymol Node Server specific control parameters that may be used are:
  
    dataThymolLoading: this is a boolean control, if set to "true", the server will load and execute any JavaScript files that are specified in "data-thymol-load" attributes of <script> tags in templates as they are processed.
                       The value of this control defaults to "false", so "data-thymol-load" scripts are ignored by default.
     
    resetPerRequest: this is a boolean control, if set to "true", the server will reset all internal configuration on receipt of every new request. (This is used by Thymol automated integration tests). 

 You can fine tune the jQuery configuration using the jQueryConfiguration initialiser (properties of this object are set on jQuery instances).

For example using:

    jQueryConfiguration: {
      support: {
        cors: true
      }
    }

 Will set the "support.cors" property of jQuery instances to "true" (you may need to do this if you're using jQuery 1.x.x).
 
Operation
---------

  The thymol-server will process templates rooted at the specified <i>webapp-root</i> value.
  
  The server follows the same syntax and applies the same rules as client-side [Thymol](http://www.thymoljs.org/) except that JavaScript files defined by the "src" attributes of &lt;script&gt; tags are ignored.
  
  JavaScript files defined by "data-thymol-load" attributes in &lt;script&gt; tags will also be ignored unless the "dataThymolLoading" configuration option is set to "true".
  
Examples
--------

The following 2 examples illustrate some familiar static demonstration cases.  

a). Download the [2.X-master branch from thymol.js](https://github.com/thymol/thymol.js/archive/2.x-master.zip) and start the server with the sourceforge/Webcontent sub-directory as the webapp root directory:

    thymol <installation-path>/thymol/sourceforge/Webcontent
   
Then browse to http://localhost:3000/examples. Most of these examples should work correctly with the exception of "say hello (split)" and "session" that depend on client-side only features.

b). Clone the [Thymol petclinic example project](https://github.com/thymol/thymol.thymeleafexamples-petclinic) and start the server with "petclinic.js" as the web application code file, the src/main/webapp sub-directory as the webapp root directory and "/WEB-INF/thymeleaf" as the template path:

    thymol -w <installation-path>/src/main/webapp/resources/thymol/petclinic.js  <installation-path>/src/main/webapp /WEB-INF/thymeleaf
  
 Where &lt;installation-path&gt; is the fully qualified path to the project installation directory (including "thymol.thymeleafexamples-petclinic"). 
 
 Once the server has started, browse to http://localhost:3000/welcome - you should see the well known petclinic home page.
 
 Most of the remaining petclinic site pages will not work correctly until the back-end database has been set up correctly. For instructions on how this is done please see [here](https://github.com/thymol/thymol.thymeleafexamples-petclinic).  


Issues/Support
--------------

 For bug reports/enhancement requests use the issues link [here](https://github.com/thymol/thymol-node-server/issues).
 
 For support or further information, please post a question on the [Thymol users forum](http://forum.thymoljs.org/).

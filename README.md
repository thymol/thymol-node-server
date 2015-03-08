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
Or clone this project and "npm install" it (locally).

Configuration
-------------

There is a single configuration file config/server-config.js.
You can set various control parameters using this file [(see)](http://www.thymoljs.org).
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

   thymol <path-to-template-root>

If you're using a git clone:

Then on *nix simply run:

   bin/thymol-server <path-to-template-root>

On Windows run this file using the nodejs node command:

   node bin/thymol-server <path-to-template-root>

Issues/Support
--------------

For bug reports/enhancement requests use the issues link on this [page](https://github.com/thymol/thymol-node-server/issues).
For support or further information, please post a question on the [Thymol users forum](http://forum.thymoljs.org/).

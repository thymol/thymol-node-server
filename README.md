Thymol Node Server
==================

A nodejs based server-side JavaScript Thymeleaf template engine built on Thymol and Express.

This is an experimental web server that processes server-side [Thymeleaf](http://www.thymeleaf.org) templates and [Thymol](http://www.thymoljs.org) JavaScript data files returning documents rendered as HTML.

Pre-Requisites
--------------

You will need [nodejs](http://nodejs.org/download/) and npm (node comes with npm now).
This project depends on the Thymol Node module see [npmjs](https://www.npmjs.com/package/thymol-node) and [github](https://github.com/thymol/thymol.js/blob/2.x-master/dist/thymol-node.js).

Installation
------------

Simply "npm install" it.

Configuration
-------------

There is a single configuration file config/server-config.js. Change the value of "templateRoot" to the path to your template directory.
<i>The default config file value assumes that you have cloned the thymol.js project as "thymol" in the same project root directory as thymol-node-server.</i>

Execution
---------

On *nix simply run bin/thymol-server as a shell script. On Windows run this file using the nodejs node command.

Issues/Support
--------------

For bug reports/enhancement requests use the issues link on this [page](https://github.com/thymol/thymol-node-server/issues).
For support or further information, please post a question on the [Thymol users forum](http://forum.thymoljs.org/).

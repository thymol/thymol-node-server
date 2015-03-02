Thymol Node Server
==================

A nodejs based server-side JavaScript Thymeleaf template engine built on Thymol and Express.

This is an experimental web server that processes server-side [Thymeleaf](http://www.thymeleaf.org) templates and [Thymol](http://www.thymoljs.org) JavaScript data files returning documents rendered as HTML.

Pre-Requisites
--------------

You will need [nodejs](http://nodejs.org/download/).
You also need a copy of the Thymol Node module. You can find the latest version [here](https://github.com/thymol/thymol.js/blob/2.x-master/dist/). <i>(Choose thymol-node.js or thymol-node.min.js)</i>

Installation
------------

Clone the project and "npm install" it (node comes with npm now).

Configuration
-------------

There is a single configuration file config/server-config.js. Change the value of "thymolNode" to point to your copy of thymol-node.js, and change "templateRoot" to the path to your template directory.
<i>The default config file values assume that you have cloned the thymol.js project as "thymol" in the same project root directory as thymol-node-server.</i>

Execution
---------

On *nix simply run bin/thymol-server as a shell script. On Windows run this file using the nodejs node command.

Issues/Support
--------------

For bug reports/enhancement requests use the issues link on this [page](https://github.com/thymol/thymol-node-server/issues).
For support or further information, please post a question on the [Thymol users forum](http://forum.thymoljs.org/).

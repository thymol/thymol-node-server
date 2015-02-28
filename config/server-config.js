var thymolServerConfiguration = {
  host: "localhost",                                                          // Server host defaults to 0.0.0.0
  port: 3000,                                                                 // Server listening port defaults to 3000
  thymolNode:  __dirname + "/../../thymol/dist/thymol-node.min.js",			      // Points to the thymol-node library
  templateRoot: __dirname + "/../../thymol/target/test-classes/templates",		// Path to templates root directory
  templatePath : "",
  templateOffset: "",
  debug : true,
  defaults: {      
    prefix : "th",
    dataPrefix : "data",
    precision : 10,
    protocol : "file://",
    locale : "en",
    precedence : 20000,
    messagePath : "",
    messagesBaseName : "Messages",
    relativeRootPath: "",
    extendedMapping: false,
    localMessages: true,
    disableMessages: false,
    templateSuffix: ".html"               
  }
};
  
module.exports = thymolServerConfiguration;

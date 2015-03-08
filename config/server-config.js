var thymolServerConfiguration = {
  host: "localhost",                      // Server host defaults to 0.0.0.0
  port: 3000,                             // Server listening port defaults to 3000
  templateRoot: __dirname + "/default",   // Path to templates root directory
  templatePath : "",
  debug : true,
/*  jQueryConfiguration: {                  // Properties to be copied to jQuery
    support: {
      cors: true                          // Required if you need to use jquery@1*
    }
  },*/
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

var thymolServerConfiguration = {
  thymolNode: "${path-to-thymol-node.js}",
  templateRoot: "${path-to-templates}",
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

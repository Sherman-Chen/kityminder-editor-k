module.exports = {
    xml2json: function(xml, extended) {
        return window.jQuery.xml2json(xml, extended);
    },
    parseXML: function(text) {
        return window.jQuery.parseXML(text);
    }
}
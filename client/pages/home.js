var PageView = require('./base');
var homeTemplate = require('../templates/pages/home.jade');


module.exports = PageView.extend({
    pageTitle: 'home',
    template: homeTemplate
});

var PageView = require('./base');
var GroupView = require('../views/group');
var homeTemplate = require('../templates/pages/home.jade');


module.exports = PageView.extend({
    pageTitle: 'home',
    template: homeTemplate,
    render: function () {
      this.renderWithTemplate();
      this.renderCollection(this.collection, GroupView, this.queryByHook('groups'));
      return this;
    }
});

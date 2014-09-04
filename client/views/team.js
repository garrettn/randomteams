var View = require('ampersand-view');
var PersonView = require('./person');


module.exports = View.extend({
    template: '<ul class="list-group"></ul>',
    render: function () {
      this.renderWithTemplate();
      this.renderCollection(this.model.members, PersonView, this.el);
      return this;
    }
});

/*global me, app*/
var Router = require('ampersand-router');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'groups/:id': 'group',
        'groups/:id/teams/:size': 'teams',
        '(*path)': 'catchAll'
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

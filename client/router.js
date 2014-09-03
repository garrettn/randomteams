/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'collections': 'collections',
        '(*path)': 'catchAll'
    },

    catchAll: function () {
        this.redirectTo('');
    }
});

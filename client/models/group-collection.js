// group Collection - group-collection.js
var AmpCollection = require('ampersand-rest-collection');
var Group = require('./group');


module.exports = AmpCollection.extend({
    model: Group,
    url: '/api/groups'
});

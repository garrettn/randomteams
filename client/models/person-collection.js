// Person Collection - person-collection.js
var AmpCollection = require('ampersand-rest-collection');
var Person = require('./person');


module.exports = AmpCollection.extend({
    model: Person,
    url: '/api/people'
});

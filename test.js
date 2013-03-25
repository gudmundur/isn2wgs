var isn2wgs = require('./');
var assert = require('assert');

var hallgrimskirkja = { latitude: 64.14180278865086, longitude: -21.92704599837957 };
var epsilon = 5e-9;

describe('isn2wgs', function() {
    it('should find Hallgrimskirkja just fine', function() {
        var ll = isn2wgs(357548, 407626);
        assert.ok(Math.abs(ll.latitude - hallgrimskirkja.latitude) < epsilon);
        assert.ok(Math.abs(ll.longitude - hallgrimskirkja.longitude) < epsilon);
    });
});

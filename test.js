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

describe('wgs2isn', function() {

	var accuratePoint = {lat: 64, lng:-21},
		accurateIsnPoint = {x: 402146.4142063, y: 390067.1248789}
		wsg2isn = isn2wgs(accuratePoint.lat, accuratePoint.lng),
	    marginOfError = 0.000001; //0,0001% margin of error

    it('should be less than the margin of error for x', function() {
        assert.ok(Math.abs(wsg2isn.x - accurateIsnPoint.x) < accurateIsnPoint.x*marginOfError);
    });

    it('should be less than the margin of error for y', function() {
        assert.ok(Math.abs(wsg2isn.y - accurateIsnPoint.y) < accurateIsnPoint.y*marginOfError);
    });
});
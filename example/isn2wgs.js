var isn2wgs = require('../');

var wgs84 = isn2wgs(process.argv[2], process.argv[3]);
console.dir(wgs84);

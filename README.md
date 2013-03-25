# isn2wgs

Converts ISNET93 coordinates to WGS84, which everyone in the world uses, except for Iceland.

This code is adapted from this [gist](https://gist.github.com/avar/585850) made by [Ævar Arnfjörð](http://github.com/avar) and is published with his permission.

# Example

``` js
var isn2wgs = require('isn2wgs');
var wgs84 = isn2wgs(357548, 407626);
console.dir(wgs84);
```

***

```
{ latitude: 64.14180278865086, longitude: -21.92704599837957 }
``

# Methods

``` js
var isn2wgs = require('isn2wgs')
```

## isn2wgs(x, y)

Return an object with the converted latitude and longitude of the passed in `x` and `y` coordinates.

# Install

With [npm](https://npmjs.org) do:

```
npm install isn2wgs
```

# License

MIT


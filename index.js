// https://gist.github.com/avar/585850

var a = 6378137.0;
var f = 1/298.257222101;

var lat1 = 64.25;
var lat2 = 65.75;
var latc = 65.00;
var lonc = 19.00;

var eps = 0.00000000001;

var fx = function(p) {
    return a * Math.cos(p/rho)/Math.sqrt(1 - Math.pow(e * Math.sin(p/rho), 2));
}

var f1 = function(p) {
    return Math.log((1 - p)/(1 + p));
}

var f2 = function(p) {
    return f1(p) - e * f1(e * p);
}

var f3 = function(p) {
    return pol1*Math.exp((f2(Math.sin(p/rho)) - f2sin1)*sint/2);
}

var rho = 45/Math.atan2(1.0,1.0);
var e = Math.sqrt(f * (2 - f));

var dum = f2(Math.sin(lat1/rho)) - f2(Math.sin(lat2/rho));;
var sint = 2 * (Math.log(fx(lat1)) - Math.log(fx(lat2))) / dum;

var f2sin1 = f2(Math.sin(lat1/rho));
var pol1 = fx(lat1)/sint;
var polc = f3(latc) + 500000.0;

var peq = a * Math.cos(latc/rho)/(sint*Math.exp(sint*Math.log((45-latc/2)/rho)));

function isn2wgs(x,y){
    var pol = Math.sqrt(Math.pow(x-500000, 2) + Math.pow(polc-y, 2));

    var lat = 90 - 2 * rho * Math.atan(Math.exp(Math.log(pol / peq) / sint));
    var lon = 0;

    var fact = rho * Math.cos(lat / rho) / sint / pol;

    var delta = 1.0;
    while (Math.abs(delta) > eps) {
        delta = (f3(lat) - pol) * fact;
        lat += delta;
    }

    var lon = -(lonc + rho * Math.atan((500000 - x) / (polc - y)) / sint);

    return { latitude: lat, longitude: lon };
}

//Note to self: Not as accurate as the other operation. Needs better mathematical approach
function wgs2isn(x,y){
    l = parseFloat(x);
    m = parseFloat(y);
    var k=l*0.0174532925199433;
    var p=0.0818191913305*Math.sin(k);
    var o=11616778.382033*Math.pow(Math.tan(0.785398163397448-(k/2))/Math.pow((1-p)/(1+p),0.04090959566525),0.90633380084752);
    var q=(m+19)*0.0158185089469038;
    return {
        x:Math.round((500000+o*Math.sin(q))*1000)/1000,
        y:Math.round((3482044.27322585-o*Math.cos(q))*1000)/1000
    };
}

module.exports = function(x, y) {
    //Bad solution, we could be looking for isnet93 value that is lower than 180
    //and therfore the functionality would be completely broken. Luckily that point
    //is somewhere out in the ocean 
    if(x > 180){ 
        return isn2wgs(x,y);
    }else{
        return wgs2isn(x,y);
    }
}


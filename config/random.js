// config/random.js

var numbers = '0123456789';
var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var alphanumeric = numbers + alphabet;

function randomString(length, chars){
    var result = '';
    for (var i = length; i > 0; --i){
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
}

exports.randomAlphanumericString = function (length){
    return randomString(length, alphanumeric);
}
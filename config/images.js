// config/images.js

var sharp = require('sharp');
var fs = require('fs');

exports.resizeImage = function (path, outputPath, dimX, dimY, callback){
	sharp(path).resize(dimX, dimY).toFile(outputPath, function (err){
		if (err)
			callback(err);

		callback(null);
	});
};

exports.changeFileLocation = function (path, outputPath, callback){
	fs.rename(path, outputPath, function (err){
		if (err)
			callback(err);

		callback(null);
	});
};

exports.deleteFile = function (path, callback){
	fs.unlink(path, function (err){
		if (err)
			callback(err);

		callback(null);
	});
};

exports.extensionForMimeType = function (mimetype){
	var extension = "";
    switch (mimetype){
        case "image/bmp":
            extension = ".bmp";
            break;

        case "image/jpeg":
            extension = ".jpg";
            break;

        case "image/png":
            extension = ".png";
            break;

        default:
            extension = ".jpg";            
    }
    return extension;
};
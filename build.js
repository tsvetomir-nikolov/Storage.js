
var fs = require('fs');
var UglifyJS = require('uglify-js');
var result = UglifyJS.minify(__dirname + '/lib/storage.js');
var targetPath = __dirname + '/build/storage.min.js';

fs.writeFile(targetPath, result.code, function(err) {
	console.log('Building successful.');	
});
var fs = require('fs');
var mongoose = require('mongoose');

var configs = require('../configs');

mongoose.connect(configs.mongoose.uri, configs.mongoose.options);

var db = mongoose.connection;

db.on('error', function(){
    console.error( 'connection error:')
});
db.once('open', function callback () {
    console.log("DB:OPEN")
    
});

fs.readdirSync(__dirname).forEach(function(fileName) {
    if (fileName === "index.js") {
        return;
    }
    var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
    if ( ext !== 'js') {
        return;
    }
    require(__dirname + '/' + fileName);
});
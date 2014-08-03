window.onerror = function(message, url, line) {
	alert(message + "\n" + url + ":" + line);
};

var React = require('react');
var App =  require('./app');

function startApp(){
	var app = new App({});
	React.renderComponent(app, document.body);	
}

window.onload = function(){
	var url = document.URL;
	var isSmart = (url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
	if( isSmart ){
		document.addEventListener('deviceready', startApp, false);
	}
	else{
		startApp();
	}
}
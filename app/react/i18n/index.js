var configs = require('../configs');
var langs = require('./langs');

function Translator(){
	this.languages = langs.languages;	
	this.translations = langs.translations;
	this.setLocale();
}


Translator.prototype = {
	
	setLocale: function(_locale){
		if( !_locale || typeof this.translations[_locale] == 'undefined' ){
			_locale = window.localStorage.getItem('locale') || 'en';
		}
		this.locale = _locale;
		window.localStorage.setItem('locale', _locale);
	},
	
	getLocale: function(){
		return this.locale;
	},

	getLanguages: function(){
		return this.languages
	},
	
	translate: function(key, params){
		key = key.toLowerCase();
		
		params = params || {};
		if( !!!this.translations[this.locale][key] ){
			return 't:' + key;
		}
		var t = this.translations[this.locale][key];
		for(var i in params){
			t = t.replace('{' + i + '}', params[i]);
		}
		return t;
	},

	log: function(token){
		return;
		$.ajax({
			url: '/api/lang/jstoken',
			type: 'POST',
			data: {token: token}
		}).done(function(){});
	},

	hasLocale: function(locale){

	}
};

var translator = new Translator();

module.exports  = {

	translator: translator,
	
	_: function(){
		if( !translator ){
			return arguments[0];
		}
		return translator.translate.apply(translator, arguments);
	}

};
var constants = require('../constants/i18n');
var Fluxy = require('fluxy');
var i18n = require('./i18n/index')

function Translator(){
  console.log(i18n);
  this.languages = i18n.languages; 
  this.translations = i18n.translations;
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
    return '_:' + t;
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


I18Store = Fluxy.createStore({
  getInitialState: function(){
    return {
      locale: 0
    }
  },
  
  getLocale: function(){
    return translator.getLocale();
  },

  getLanguages: function(){
    return translator.getLanguages();
  },
  
  _: function(key, params){
    return translator.translate(key, params)
  },

  actions: [
  [constants.SET_LOCALE, function (locale) {
    translator.setLocale(locale);
    this.set('locale', locale)
  }]
  ],

  Mixin: function(){
    return LanguageMixin
  }

});

var LanguageMixin = {
  componentWillMount: function(){
    I18Store.addWatch(this.__onI18StorChange);
  },
  componentWillUnmount: function(){
    I18Store.removeWatch(this.__onI18StorChange);
  },
  __onI18StorChange: function(){
    this.forceUpdate();
  }
}

module.exports = I18Store;
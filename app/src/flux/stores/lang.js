var storage = require('../../util/storage');
var constants = require('../constants/lang');
var ReactFlux = require('react-flux');
var Lang = require('./lang/index');
var _ = require('underscore');

var Store = ReactFlux.createStore({

  getInitialState: function(){
    return {
      locale: null,
      selected: null
    };
  },

  storeDidMount: function(){
    this.setLocale( storage.getItem('locale') );
  },

  setLocale: function(locale){
    if( !locale || typeof Lang.translations[locale] == 'undefined' ){
      locale =  Lang.defaultLocale;
    }
    this.setState({
      locale: locale,
      selected: this.getLanguage(locale)
    });
    storage.setItem('locale', locale);
  },


  getLanguages: function(){
    return Lang.languages;
  },

  getLocale: function(){
    return this.state.get('locale');
  },

  getSelected: function(){
    return this.getLanguage(this.state.get('locale'));
  },
  
  getLanguage: function(locale){
    return _.find(Lang.languages, function(lang){
      return lang.code == locale;
    });
  },

  /**
  * Translate function
  */
  _: function(key, params){
    key = key.toLowerCase();
    params = params || {};
    var locale = this.state.get('locale');
    var t = Lang.translations[locale][key];
    if( typeof t == 'undefined' ){
      return  key;
    }
    
    for(var i in params){
      t = t.replace('{' + i + '}', params[i]);
    }
    return t;
  }
}, [

  [constants.SET_LOCALE_SUCCESS, function (payload) {
    this.setState({
      locale: payload.locale
    });
  }]

]);

module.exports = Store;
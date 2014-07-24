var storage = require('../../util/storage');
var constants = require('../constants/i18n');
var ReactFlux = require('react-flux');
var i18n = require('./i18n/index');

var Store = ReactFlux.createStore({

  getInitialState: function(){
    return {
      locale: null
    };
  },

  storeDidMount: function(){
    this.setLocale( storage.getItem('locale') );
  },

  setLocale: function(locale){
    if( !locale || typeof i18n.translations[locale] == 'undefined' ){
      locale =  i18n.defaultLocale;
    }
    this.setState({
      locale: locale
    });
    storage.setItem('locale', locale);
  },

  getLocale: function(){
    return this.getState().locale;
  },

  getLanguages: function(){
    return i18n.languages;
  },

  /**
  * Translate function
  */
  _: function(key, params){
    key = key.toLowerCase();
    params = params || {};
    var locale = this.getState().locale;
    var t = i18n.translations[locale][key];
    if( typeof t == 'undefined' ){
      return '?:' + key;
    }
    
    for(var i in params){
      t = t.replace('{' + i + '}', params[i]);
    }
    return '_:' + t;
  }
}, [

  [constants.I18N_SET_LOCALE_SUCCESS, function (payload) {
    this.setState({
      locale: payload.locale
    });
  }]

]);

module.exports = Store;
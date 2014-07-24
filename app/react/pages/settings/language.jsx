/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var Navigation = require('./nav');
var I18nStore = require('../../flux/stores/i18n');
var I18nActions = require('../../flux/actions/i18n')
var __ = I18nStore._;

module.exports = React.createClass({
  
  getInitialState: function(){
    return {
      languages: I18nStore.getLanguages(),
      locale: I18nStore.getLocale()
    } 
  },

  componentWillMount: function(){
    I18nStore.addChangeListener(this.onI18nChange);
  },

  componentWillUnmount: function(){
    I18nStore.removeChangeListener(this.onI18nChange);
  },

  onI18nChange: function(){
    this.setState({
      languages: I18nStore.getLanguages(),
      locale: I18nStore.getLocale()
    });
    this.props.setPageTitle(__('language'));
  },

  componentDidMount: function(){
    this.props.setPageTitle(__('language'));
  },

  getSelectedLanguage: function(){
    for(var i=0; i < this.state.languages.length; i++){
      if( this.state.languages[i].code == this.state.locale ){
        return this.state.languages[i];
      }
    }
    return null;
  },
  
  selectLang: function(code){
    I18nActions.setLocale(code);
    return false;
  },

  render: function(){

    var selected = this.getSelectedLanguage();
    if( !selected ){
      selected = this.state.languages[0];
    }

    var langs = [];
    _.each(this.state.languages, function(lang){
      var selectedIndicator = null;
      if ( lang.code == selected.code ){
        selectedIndicator = <i className="ion-ios7-checkmark pull-right" style={{fontSize:20}} />;
      }
      langs.push(
        <li key={lang.code} className="list-group-item"  onClick={this.selectLang.bind(this, lang.code)}>
        {selectedIndicator}
        {lang.name}
        </li>
        );
    }.bind(this));
    
    return(
      <div>
      <Navigation />
      <div className="p10">
      <ul className="list-group">
      {langs}                
      </ul>
      </div>
      </div>
      );
  }
});
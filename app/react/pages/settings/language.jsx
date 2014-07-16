/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var __ = require('../../i18n')._;
var translator = require('../../i18n').translator;
var Navigation = require('./nav');

module.exports = React.createClass({
  
  getInitialState: function(){
    var languages = translator.getLanguages();
    var locale = translator.getLocale();
    var selected = null;
    for(var i=0; i < languages.length; i++){
      if( languages[i].code == locale ){
        selected = languages[i];
        break;
      }
    }
    return {
      languages: languages,
      selected: selected
    } 
  },
  
  componentDidMount: function(){
    this.props.setPageTitle(__('language'));
  },
  
  
  selectLang: function(code){
    //var code = $(e.target).data('code');
    for( var i = 0; i < this.state.languages.length; i++ ){
      if( code == this.state.languages[i].code ){
        this.setState({
          selected: this.state.languages[i]
        });
        translator.setLocale(this.state.languages[i].code);
        this.props.setPageTitle(__('language'));
        break;
      }
    }
    return false;
  },

  render: function(){

    var selected = this.state.selected;
    if( !selected ){
      selected = this.state.languages[0];
    }

    var langs = [];
    _.each(this.state.languages, function(lang){
      var selectedIndicated = null;
      if ( lang.code == selected.code ){
        selectedIndicated = <i className="ion-ios7-checkmark pull-right" style={{fontSize:20}} />;
      }
      langs.push(
        <li key={lang.code} className="list-group-item"  onClick={this.selectLang.bind(this, lang.code)}>
          {selectedIndicated}
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
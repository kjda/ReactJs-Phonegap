/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var Navigation = require('./nav');
var LangStore = require('../../flux/stores/lang');
var LangActions = require('../../flux/actions/lang')
var __ = LangStore._;
var UI = require('react-topui');

module.exports = React.createClass({

  getInitialState: function(){
    return this.getStateFromStores();
  },

  getStateFromStores: function(){
    return {
      languages: LangStore.getLanguages(),
      selected: LangStore.getSelected()
    } 
  },

  setPageTitle: function(){
    this.props.setPageTitle(__('language'));
  },

  componentDidMount: function(){
    LangStore.onChange( this.onLanguageChange );
    this.setPageTitle();
    this.checkSelected();
  },

  componentWillUnmount: function(){
    LangStore.offChange( this.onLanguageChange );
  },

  onLanguageChange: function(){
    this.setState( this.getStateFromStores() );
    this.setPageTitle();
    this.checkSelected();
  },

  selectLang: function(code){
    LangActions.setLocale(code);
    return false;
  },

  checkSelected: function(){
    var selected = this.state.selected;
    if( !selected ){
      return;
    }
    this.refs[selected.code].getDOMNode().checked = true;
  },
  render: function(){
    
    var langs = [];
    _.each(this.state.languages, function(lang){
      var icon = null;
      if( lang.code == this.state.selected.code ){
        icon = <UI.Icon name="checkmark" style={{fontSize: "150%"}} />
      }
      langs.push(
        <UI.ListItem 
            key={lang.code}
            ref={lang.code} 
            onClick={this.selectLang.bind(this, lang.code)}>
        {icon} {lang.name}
        </UI.ListItem>
      );
    }.bind(this));
    
    return(
      <div>
        <Navigation />
        <div className="p10">
          <UI.List>
            <UI.ListContainer>
              {langs}           
            </UI.ListContainer>     
          </UI.List>
        </div>
      </div>
      );
  }
});
/** @jsx React.DOM */
var React = require('react');
var IScroll = require('../../components/iscroll');
var Navigation = require('./nav');
var Ipsum = require('../../components/ipsum');
var __ = require('../../flux/stores/lang')._
var UI = require('react-topui');
var AppStateActions = require('../../flux/actions/appState');

module.exports = React.createClass({

  componentDidMount: function(){
    AppStateActions.setTitle(__('app.name'));
  },

  render: function(){
    return (
      <div>
      <Navigation />

      <IScroll>
      <UI.Button>Default button</UI.Button>
      
      <hr />
      
      <UI.Button full>Default button</UI.Button>
      
      <hr />
      
      <UI.Button cta>Call to action button</UI.Button>
      
      <hr />
      
      <UI.Button quiet>Quiet button</UI.Button>
      
      <hr />
      
      <UI.Button large>Large button</UI.Button>
      
      <hr />
      
      <UI.IconButton>
        <UI.Icon name="home" />
        Default button
      </UI.IconButton>
      
      <hr />
      
      <UI.IconButton quiet large full>
        <UI.Icon name="home" />
        Default button
      </UI.IconButton>
      
      <hr />

        <UI.LinkButton cta large href="#home">
        Home
        </UI.LinkButton>
      
      <hr />

      <UI.ButtonBar>
        <UI.ButtonBarItem>Button 1</UI.ButtonBarItem>
        <UI.ButtonBarItem>Button 2</UI.ButtonBarItem>
      </UI.ButtonBar>
      
      <hr />
      
      <UI.ButtonBar full large>
        <UI.ButtonBarItem full large>Button 1</UI.ButtonBarItem>
        <UI.ButtonBarItem full large>Button 2</UI.ButtonBarItem>
      </UI.ButtonBar>
      
      <hr />
      
      <UI.List>
        <UI.ListHeader>
        List Header
        </UI.ListHeader>
        <UI.ListContainer>
          <UI.ListItem>
            <a href="#1">LINK1</a>
          </UI.ListItem>
          <UI.ListItem>
            <a href="#2">LINK2</a>
          </UI.ListItem>
          <UI.ListItem>
            Lorem
          </UI.ListItem>
        </UI.ListContainer>
      </UI.List>
      
      <hr />
      
      <UI.TabBar>
        <UI.TabBarItem>
          First
        </UI.TabBarItem>
        <UI.TabBarItem>
         Second
        </UI.TabBarItem>
      </UI.TabBar>

      <hr />
      
      <UI.TabBar full>
        <UI.TabBarItem full>
          First
        </UI.TabBarItem>
        <UI.TabBarItem full>
         Second
        </UI.TabBarItem>
      </UI.TabBar>


      <hr />

      <UI.TextInput />

      <hr />
      
      <UI.TextInput large />
      
      <hr />
      
      <UI.TextInput full />

      <hr />
      
      <UI.TextInput name="username" disabled /> 

      <hr />

      <UI.Textarea />

      <hr />

      <UI.Textarea large />

      <hr />

      <UI.Textarea full />
      
      <hr />

      <UI.Search />

      <hr />


      <UI.Search large />

      <hr />
      
      <UI.Search full />
      
      <hr />

      <UI.Search disabled />

      <hr />

      <UI.Switch />

      <hr />

      <UI.Checkbox label="Checkboc label" />
      
      <hr />
        
      <UI.Checkbox checked />

      <hr />

      <UI.Checkbox disabled />


      <hr />
      
      <UI.Radio name="myname" />

      <hr />
      
      <UI.Radio left label="This label goes left" />

      <hr />

      <UI.Radio right label="This label goes right" />

      <hr />

      <UI.Radio disabled />

      <hr />

      <UI.Notification value="10 new Msgs" />

      <hr />

      <UI.Range />

      <hr />

      <UI.Range vertical />

      <hr />

      <UI.Range disabled />

      <hr />

      <UI.Icon name="circle" />
      </IScroll>
      </div>
      );
  }

});
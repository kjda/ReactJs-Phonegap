/** @jsx React.DOM */
var React = require('react');
var SnapJS = require('snapjs');
var $ = require('jquery');

module.exports = {};

module.exports.Layout = React.createClass({

  render: function(){
    return (
      <div>{this.props.children}</div>
    );
  }

});


module.exports.Drawers = React.createClass({

  statics: {
    identity: function(){
      return 'Drawers'
    }
  },
  
  render: function(){
    return (
      <div className="snap-drawers">
      {this.props.children}
      </div>
    );
  }
});

module.exports.Left = React.createClass({
  statics: {
    identity: function(){
      return 'Drawers.Left';
    }
  },
  render: function(){
    return (
      <div ref="left" className="snap-drawer snap-drawer-left">
      {this.props.children}
      </div>
    );
  }
});

module.exports.Right = React.createClass({
  statics: {
    identity: function(){
      return 'Drawers.Right';
    }
  },
  render: function(){
    return (
      <div ref="right" className="snap-drawer snap-drawer-right">
      {this.props.children}
      </div>
    );
  }
});

module.exports.Toggler = React.createClass({
  
  propTypes: {
    side: React.PropTypes.oneOf(['left', 'right']).isRequired
  },

  render: function(){
    var role = this.props.side == 'left' ?  'left-drawer-toggle' : 'right-drawer-toggle';
    return this.transferPropsTo(<span role={role}>{this.props.children}</span>);
  }
});


module.exports.Content = React.createClass({

  toggleNav: function(side){
    var state = this.snapper.state();
    if( state.state != 'closed' ){
      this.snapper.close();
      return;
    }
    if( (!!side && side == 'left') || state.info.opening == 'left' ){
      this.snapper.open('left');
      return;
    }
    this.snapper.open('right');
  },

  hideNav: function(){
    this.snapper.close();
  },

  componentDidMount: function(){
    this.leftToggler = $('[role="left-drawer-toggle"]');
    if( this.leftToggler.length ){
      this.leftToggler.on('click', this.toggleNav.bind(this, 'left'));
    }
    this.rightToggler = $('[role="right-drawer-toggle"]');
    if( this.rightToggler.length ){
      this.rightToggler.on('click', this.toggleNav.bind(this, 'right'));
    }
    this.drawerLinks = $('.snap-drawers').find('a');
    this.drawerLinks.on('click', this.hideNav);
    this.snapper = new SnapJS({
     element: this.refs.content.getDOMNode(),
     flickThreshold: 50,
     //disable: 'right',
     easing: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
   });
  },

  componentWillUnmount: function(){
    if( this.leftToggler.length ){
      this.leftToggler.off('click');
    }
    if( this.rightToggler.length ){
      this.rightToggler.off('click');
    }
    this.drawerLinks.off('click');
  },

  render: function(){
    return (
      <div ref="content" className="snap-content">
      {this.props.children}
      </div>
    );
  }

});

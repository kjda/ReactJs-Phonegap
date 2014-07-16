/** @jsx React.DOM */
 var React = require('react');
 var __ = require('../i18n')._;

 module.exports = React.createClass({
   render: function() {
     return ( 
       <div ref="content"  className="snap-content">
          <a href="/#login" className="no-outline btn btn-primary" style={{margin:5}}>{__('login')}</a>
          <a href="/#signup" className="btn btn-primary pull-right" style={{margin:5}}>{__('signup')}</a>
          <div className="page-content">
            {this.props.page}
          </div>
       </div>
     );
   }
});
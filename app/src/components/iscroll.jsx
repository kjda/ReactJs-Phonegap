/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var IScroll = require('iscroll');

module.exports = React.createClass({

	componentDidMount: function(){
		this.attachScroller();
	},

	componentDidUpdate: function(){
		this.refreshScroller();
	},

	componentWillUnmount: function(){
		if( !this.scroller ){
			return;
		}
		this.scroller.off('scrollEnd');
		this.scroller.destroy();
		window.removeEventListener('orientationchange', this.refreshScroller, false);
		window.removeEventListener('hidekeyboard', this.refreshScroller, false);
	},

	attachScroller: function(){
		if( !this.isMounted() ){
			return;
		}
		this.wrapper = $(this.refs.wrapper.getDOMNode());
		this.scroller = new IScroll(this.refs.wrapper.getDOMNode(), {
			//click: true,
			tap: true,
			scrollbars: true,
			fadeScrollbars: true,
	    //bounceEasing: 'bounce', 
	    //bounceTime: 300,
	    probeType: 3,
	    //useTransform:true
	    
	  });
		
		window.addEventListener('orientationchange', this.refreshScroller, false);
		window.addEventListener('hidekeyboard', this.refreshScroller, false);
		this.scroller.on('scrollEnd', function () {
			if(Math.abs(this.scroller.maxScrollY) - Math.abs(this.scroller.y) < 200){
				!!this.props.onScrollToBottom && this.props.onScrollToBottom();
			}
		}.bind(this));
		this.refreshScroller();
	},

	refreshScroller: function(){
		var offset = 0;
		var prevEl = this.wrapper.prev();
		if( prevEl.length ){
			offset = prevEl.offset().top + prevEl.outerHeight();	
		}
		
		this.wrapper
		.height($(window).height() - offset)
		.width($(window).width());
		this.scroller.refresh();
	},
	
	render: function(){
		return(
			<div ref="wrapper" className="scroller-wrapper">
			<div ref="scroller" className="scroller">
			{this.props.children}
			</div>
			</div>
			);
	}
});
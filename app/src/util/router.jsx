/** @jsx React.DOM */
 var Backbone = require('backbone');
 Backbone.$ = require('jquery');

var RouterActions = require('../flux/actions/router');

 module.exports = {
 	
 	router: null,

 	start: function(routes){
 		var bbRoutes = {};
 		for( var path in routes ){
 			bbRoutes[path] = handleRoute(path, routes[path]);
 		}
 		var Router = Backbone.Router.extend({
 			routes: bbRoutes
 		});
 		this.router = new Router;
 		if( typeof window != "undefined" ){
 			Backbone.history.start({pushState: false});
 		}
 		function handleRoute(path, Page){
 			var parts = path.split(/\//);
 			var params = {};
 			for(var i in parts){
 				var part = parts[i];
 				if( part.charAt(0) == ':' ){
 					params[part.substring(1)] = null;
 				}
 			}
 			return function(){
 				var args = Array.prototype.slice.call(arguments);
 				var _params = {};
 				var i=0;
 				for(var p in params){
 					_params[p] = arguments[i++] || null;
 				}
 				RouterActions.setPath(path, Page, _params);
 			}
 		}
 	},
 	
 	navigate: function(fragment){
 		if( !this.router ) {
 			throw new Error('Router was not initiated');
 		}
 		this.router.navigate(fragment, {trigger: true});
 	},

 	back: function(){
 		window.history.back();
 		return false;
 	}

 }

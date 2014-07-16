/** @jsx React.DOM */

var React = require('react');
var FastClick = require('fastclick');
var LayoutUser = require('./components/layoutUser');
var LayoutPublic = require('./components/layoutPublic');
var Dialogs = require('./mixins/dialogs');
var PushNotifications = require('./mixins/pushNotifications');
var Offline = require('./pages/offline');
var translator = require('./i18n').translator;

var DummyUser = {
		data: {
			id: 1,
			username: 'Max Mustermann',
		},
		getData: function(){
			return this.data;
		},
		getSid: function(){
			return 'SESSION ID 1';
		},
		isAuth: function(){
			return true;
		},
		clearSession: function(){

		}
};

var App = React.createClass({

	mixins: [Dialogs, PushNotifications],
	
	user: DummyUser,
	
	router: require('./util/router'),
	
	routes: require('./routes'),

	getInitialState: function(){
		return {
			ready: true,
			path: null,
			pageTitle: '',
			locale: null,
			routeParams: {}
		};
	},
	
	componentWillMount: function(){
		document.addEventListener('backbutton', this.handleBackButton, false);
		document.addEventListener('offline', this.onOffline, false);
		document.addEventListener('online', this.onOnline, false);
		document.addEventListener("resume", this.onResume, false);
	},
	
	componentDidMount: function(){
		FastClick(document.body);
		this.router.start(this, this.routes);

	},

	handleBackButton: function(){
		switch( this.state.path ){
 			case '':
 				this.confirm('Exit app?', this.exit)
 				break;
 			case 'login':
 			case 'signup':
 			case 'settings':
 				this.router.navigate('/');
 				break;
 			default:
 				this.router.back();
 				break;
 		}
	},
	
	onOffline: function(){
		this.setState({
			offline: true
		})
	},
	
	onOnline: function(){
		this.setState({
			offline: false
		})
	},

	onResume: function(){
		
	},
	
	exit: function(){
		navigator.app.exitApp();
	},
	
	setPage: function(pageClass, routeParams, path){
		this.setState({
			page: pageClass,
			routeParams: routeParams,
			path: path,
			pageTitle: '',
			locale: this.state.locale,
			forceUpdate: this.onForceUpdate
		});
		this.forceUpdate();
	},

	setPageTitle: function(title){
		this.setState({
			pageTitle: title
		});
	},
	
	isBrowser: function() {
		var url = document.URL;
		return !(url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
	},

	isAndroid: function() {
		return (device.platform.toLowerCase() == "android");
	},

	isIOS: function() {
		return (device.platform.toLowerCase() == "ios")
	},

	isIOS7: function(){
		return this.app.getIOSVersion() >= 7;
	},

	getIOSVersion: function() {
		if (!this.isIOS()) {
			return null;
		}
		if (!this.iosVersion) {
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			this.iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
			this.iosVersion = parseInt(this.iosVersion[0]);
		}
		return this.iosVersion;
	},
	
	getDeviceUuid: function() {
    return window.device.uuid;
  },

	onForceUpdate: function(){
		this.forceUpdate();
		return false;
	},
	
	render: function(){
		if( !this.state.page || !this.state.ready ){
			return <div>waiting for user to load</div>;
		}
		if( this.state.offline ){
			return this.renderWhenOffline();
		}
		var routeParams = this.state.routeParams || {};
		var page = new this.state.page({
			routeParams: routeParams,
			user: this.user,
			setPageTitle: this.setPageTitle,
			forceUpdate: this.onForceUpdate
		});
		if( !this.user.isAuth() ){
			return (<LayoutPublic page={page} />);
		}
		var showBackButton = (this.state.path != '');
		return (<LayoutUser page={page} 
			user={this.user} 
			pageTitle={this.state.pageTitle}
			locale={translator.getLocale()}
			showBackButton={showBackButton}
			back={this.handleBackButton}  />);
	},
	renderWhenOffline: function(){
		var offlinePage = new Offline({
				routeParams: {},
				user: this.user
			});
			return (<div>{offlinePage}</div>);
	}
});


function startApp(){
	React.renderComponent(new App(), document.getElementById('__wrap'));	
}

var url = document.URL;
var isSmart = (url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
if( isSmart ){
	document.addEventListener('deviceready', startApp, false);
}
else{
	startApp();
}
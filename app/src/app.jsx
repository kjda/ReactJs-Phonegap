/** @jsx React.DOM */

var React = require('react');
var FastClick = require('fastclick');
var LayoutUser = require('./components/layoutUser');
var LayoutPublic = require('./components/layoutPublic');
var Dialogs = require('./mixins/dialogs');
var PushNotifications = require('./mixins/pushNotifications');
var Offline = require('./pages/offline');
var LangStore = require('./flux/stores/lang');

var ReactFlux = require('react-flux');
var UserStore = require('./flux/stores/user');


React.initializeTouchEvents(true);

module.exports = React.createClass({

	mixins: [Dialogs, PushNotifications, UserStore.mixin()],
	
	router: require('./util/router'),
	
	routes: require('./routes'),

	getStateFromStores: function(){
		return {
			ready: true,
			path: null,
			pageTitle: '',
			locale: null,
			routeParams: {},
			user: UserStore.getData(),
			isAuth: UserStore.isAuth()
		};
	},
	
	componentWillMount: function(){
		
	},

	componentDidMount: function(){
		this.initApp();
		FastClick.call({}, document.body);
		this.router.start(this, this.routes);
	},

	initApp: function(){
		document.addEventListener('backbutton', this.handleBackButton, false);
		document.addEventListener('offline', this.onOffline, false);
		document.addEventListener('online', this.onOnline, false);
		document.addEventListener("resume", this.onResume, false);
		if( this.isAndroid() ){
			this.initAndroid();
		}
		if( this.isIOS() ){
			this.initIOS();
		}
	},

	initAndroid: function(){
		$(document.body).addClass('android');
	},

	initIOS: function(){
		$(document.body).addClass('ios');
		if( this.isIOS7() ){
			this.initIOS7();
		}
	},

	initIOS7: function(){
		$(document.body).addClass('ios7');
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
			path: path
		});
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
	getPlatform: function(){
		var platform = '';
		if( !!window.device && !!window.device.platform ){
			platform = window.device.platform.toLowerCase();
		}
		return platform;
	},
	isAndroid: function() {
		return (this.getPlatform() == "android");
	},

	isIOS: function() {
		return (this.getPlatform() == "ios")
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
		return !!window.device ? window.device.uuid : null;
	},
	
	render: function(){
		if( !this.state.ready || !this.state.page ){
			return <div>loading...</div>;
		}
		if( this.state.offline ){
			return this.renderWhenOffline();
		}
		var routeParams = this.state.routeParams || {};
		var page = new this.state.page({
			routeParams: routeParams,
			user: this.state.user,
			isAuth: this.state.isAuth,
			setPageTitle: this.setPageTitle
		});

		if( !this.state.isAuth ){
			return (
				<LayoutPublic 
				page={page} />
				);
		}
		var showBackButton = (this.state.path != '');
		return (<LayoutUser page={page} 
			user={this.state.user}
			isAuth={this.state.isAuth}
			pageTitle={this.state.pageTitle}
			locale={LangStore.getLocale()}
			showBackButton={showBackButton}
			back={this.handleBackButton}  />);
	},
	renderWhenOffline: function(){
		var offlinePage = new Offline({
			user: this.state.user
		});
		return (<div>{offlinePage}</div>);
	}
});
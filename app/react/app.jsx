/** @jsx React.DOM */

var React = require('react');
var FastClick = require('fastclick');
var LayoutUser = require('./components/layoutUser');
var LayoutPublic = require('./components/layoutPublic');
var Dialogs = require('./mixins/dialogs');
var PushNotifications = require('./mixins/pushNotifications');
var Offline = require('./pages/offline');
var I18nStore = require('./flux/stores/i18n');

var ReactFlux = require('react-flux');
var UserStore = require('./flux/stores/user');


module.exports = React.createClass({

	mixins: [Dialogs, PushNotifications],
	
	router: require('./util/router'),
	
	routes: require('./routes'),

	getInitialState: function(){
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
		UserStore.addChangeListener(this.onUserChanged);
		document.addEventListener('backbutton', this.handleBackButton, false);
		document.addEventListener('offline', this.onOffline, false);
		document.addEventListener('online', this.onOnline, false);
		document.addEventListener("resume", this.onResume, false);
	},
	componentWillUnmount: function () {
		UserStore.removeChangeListener(this.onUserChanged);
	},
	componentDidMount: function(){
		FastClick(document.body);
		this.router.start(this, this.routes);

	},
	onUserChanged: function(){
		this.setState({
			user: UserStore.getData(),
			isAuth: UserStore.isAuth()
		});
		this.forceUpdate();
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
			pageTitle: ''
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
	
	render: function(){
		if( !this.state.ready || !this.state.page ){
			return <div>loadin...</div>;
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
			locale={I18nStore.getLocale()}
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
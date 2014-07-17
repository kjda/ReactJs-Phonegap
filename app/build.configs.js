module.exports = {
	targetDirectory: 'phonegap-app',
	phonegapServePort: 3131,
	app: {
		namespace: 'com.kjda.reactjs.phonegap',
		version: '0.0.1',
		name: 'ReactJs-Phonegap App',
		description: 'A boilerplate ReactJs-Phonegap App!',
		author: {
			name: 'Khaled Jouda',
			website: 'https://github.com/kjda/',
			email: ''
		},
		accessOrigin: '*',
		orientation: 'all', //all: default means both landscape and portrait are enabled
		targetDevice: 'universal', //handset, tablet, or universal
		exitOnSuspend: 'true', //ios: if set to true, app will terminate when home button is pressed
		phonegapPlugins: [
			{
				name: 'org.apache.cordova.core.device',
				installFrom: 'org.apache.cordova.core.device',
				version: null
			},
			{
				name: 'org.apache.cordova.core.dialogs',
				installFrom: 'org.apache.cordova.core.dialogs',
				version: null
			},
			{
				name: 'org.apache.cordova.geolocation',
				installFrom: 'org.apache.cordova.geolocation',
				version: null
			},
			{
				name: 'org.apache.cordova.core.vibration',
				installFrom: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-vibration.git',
				version: null
			},
			{
				name: 'org.apache.cordova.statusbar',
				installFrom: 'org.apache.cordova.statusbar',
				version: null
			},
			{
				name: 'com.phonegap.plugins.pushplugin',
				installFrom: 'https://github.com/phonegap-build/PushPlugin.git',
				version: '2.1.1'
			},
			{
				name: 'org.apache.cordova.core.inappbrowser',
				installFrom: 'org.apache.cordova.core.inappbrowser',
				version: null
			},
			{
				name: 'org.apache.cordova.statusbar',
				installFrom: 'org.apache.cordova.statusbar',
				version: null
			},
			{
				name: 'org.apache.cordova.splashscreen',
				installFrom: 'org.apache.cordova.splashscreen',
				version: null
			},
			{
				name: 'it.mobimentum.phonegapspinnerplugin',
				installFrom: 'https://github.com/mobimentum/phonegap-plugin-loading-spinner.git',
				version: null
			}
		],
		icons: [
			{
				src: 'img/appicons/icon60x60@2x.png',
				platform: null,
				width: '60',
				height: '60' 
			}
		],
		splashscreens: [
			{
				src: 'img/splash/splash-320x460.png',
				platform: null,
				width: '320',
				height: '460' 
			},
			{
				src: "img/splash/splash-640x920.png",
				platform: "android",
				density: "ldpi"
			}
		]
	}
	
}

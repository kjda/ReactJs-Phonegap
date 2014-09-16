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
				installFrom: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git',
				version: null
			},
			{
				name: 'org.apache.cordova.core.dialogs',
				installFrom: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs',
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
				installFrom: 'https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git',
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
				src: 'res/icon/android/icon-36-ldpi.png',
				platform: 'android',
				width: '36',
				height: '36',
				density: 'ldpi'
			},
			{
				src: 'res/icon/android/icon-48-mdpi.png',
				platform: 'android',
				width: '48',
				height: '48',
				density: 'mdpi'
			},
			{
				src: 'res/icon/android/icon-72-hdpi.png',
				platform: 'android',
				width: '72',
				height: '72',
				density: 'hdpi'
			},
			{
				src: 'res/icon/android/icon-96-xhdpi.png',
				platform: 'android',
				width: '96',
				height: '96',
				density: 'xhdpi'
			}
		],
		splashscreens: [
			{
				src: 'res/screen/adnroid/screen-hdpi-landscape.png',
				platform: 'android',
				width: '800',
				height: '480'
			},
			{
				src: 'res/screen/adnroid/screen-hdpi-portrait.png',
				platform: 'android',
				width: '480',
				height: '800'
			},
		]
	}

}

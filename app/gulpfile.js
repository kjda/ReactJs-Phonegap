var gulp = require('gulp');
var browserify = require('gulp-browserify');
var react = require('gulp-react');

var less = require('gulp-less');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var runSequence = require('gulp-run-sequence');
var jsValidate = require('gulp-jsvalidate');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var replace = require('gulp-replace');

var path = require('path');

var configs = require('./build.configs.js');

var PHONEGAP_APP_DIR = configs.targetDirectory;
var PHONEGAP_DEVELOPER_APP_PORT = configs.phonegapServePort;


var phonegapPluginCommands = [];
for(var i = 0; i < configs.app.phonegapPlugins.length; i++){
	var p = configs.app.phonegapPlugins[i];
  	phonegapPluginCommands.push('phonegap plugin add ' + p.installFrom);
}

function getPluginsXML(){
	var xml = '';
	for(var i = 0; i < configs.app.phonegapPlugins.length; i++){
		var p = configs.app.phonegapPlugins[i];
		var pluginXml = '<gap:plugin name="' + p.name + '"';
		if( !!p.version ){
			pluginXml += ' version="' + p.version + '"';
		}
		pluginXml += '/>' + "\n";
		xml += pluginXml;		
	}
	return xml;
}
function getIconsXML(){
	var xml = '';
	for(var i = 0; i < configs.app.icons.length; i++){
		var e = configs.app.icons[i];
		var eXml = '<icon src="' + e.src + '"';
		if( !!e.platform ){
			eXml += ' gap:platform="' + e.platform + '"';
		}
		if( !!e.width ){
			eXml += ' width="' + e.width + '"';
		}
		if( !!e.height ){
			eXml += ' height="' + e.height + '"';
		}
		if( !!e.density ){
			eXml += ' gap:density="' + e.density + '"';
		}
		eXml += '/>' + "\n";
		xml += eXml;
	}
	return xml;
}
function getSplashscreenXML(){
	var xml = '';
	for(var i = 0; i < configs.app.splashscreens.length; i++){
		var e = configs.app.splashscreens[i];
		var eXml = '<gap:splash src="' + e.src + '"';
		if( !!e.platform ){
			eXml += ' gap:platform="' + e.platform + '"';
		}
		if( !!e.width ){
			eXml += ' width="' + e.width + '"';
		}
		if( !!e.height ){
			eXml += ' height="' + e.height + '"';
		}
		eXml += '/>' + "\n";
		xml += eXml;
	}
	return xml;
}
gulp.task('default', function(){
	gulp.watch([
		'./react/**/*.jsx',
		'./react/**/*.js',
		'./assets-src/less/*.less'
	], ['build-app']);
});

gulp.task('build-app', function(cb){
	runSequence(
		'clean-build', 
		'compile-jsx', 
		'browserify',
		'bundle-js', 
		'compile-less', 
		'fonts', 
		'concat-css', 
		'copy-index',
		'copy-config-xml',
		cb);
});

gulp.task('clean-build', function(){
	return gulp.src('./build', {read: false})
        .pipe(clean());
});

gulp.task('compile-jsx', function(){
	return gulp.src([
		'./react/**/*.jsx',
		'./react/**/*.js'
	])
	.pipe(plumber())
	.pipe(react({ addPragma: false }))

	.pipe(gulp.dest('./build/'));
});
gulp.task('browserify', function(){ 
  return gulp.src(['./build/app.js'])
    .pipe(plumber())
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./build/'));
});


gulp.task('compile-less', function(){
  return gulp.src('./assets-src/less/**/*.less')
    .pipe(plumber())
    //.pipe(flatten())
    .pipe(less({paths: './build/css/'}))
    .pipe(concat('lessed.css'))
    
    .pipe(gulp.dest('./build/css/'));
});
gulp.task('concat-css', function(){
	return gulp.src([
		'./assets-src/bower/snapjs/snap.css',
		'./assets-src/bower/ionic/release/css/ionic.min.css',
		'./assets-src/bower/bootstrap/dist/css/bootstrap.min.css',
		'./build/css/lessed.css'
	])
	.pipe(plumber())
	.pipe(concat('bundle.css'))
	.pipe(gulp.dest('./' + PHONEGAP_APP_DIR + '/www/css/'));
});

gulp.task('bundle-js', function(){
	return gulp.src([
		'./assets-src/bower/jquery/dist/jquery.min.js',
		'./assets-src/bower/bootbox/bootbox.js',
		'./assets-src/bower/bootstrap/dist/js/bootstrap.min.js',
		'./assets-src/bower/snapjs/snap.min.js',
		'./assets-src/bower/iscroll/build/iscroll.js',
		'./build/app.js'
	])
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest('./' + PHONEGAP_APP_DIR + '/www/js/'))
});

gulp.task('copy-index', function(){
	return gulp.src('./react/index.html')
	.pipe(gulp.dest('./' + PHONEGAP_APP_DIR + '/www/'))
});

gulp.task('copy-config-xml', function(){
	return gulp.src('./react/config.xml')
	.pipe(replace(/{NAMESPACE}/g, configs.app.namespace))
	.pipe(replace(/{VERSION}/g, configs.app.version))
	.pipe(replace(/{APP_NAME}/g, configs.app.name))
	.pipe(replace(/{APP_DESCRIPTION}/g, configs.app.description))
	.pipe(replace(/{AUTHOR_WEBISTE}/g, configs.app.author.website))
	.pipe(replace(/{AUTHOR_EMAIL}/g, configs.app.author.email))
	.pipe(replace(/{AUTHOR_NAME}/g, configs.app.author.name))
	.pipe(replace(/{PLUGINS}/g, getPluginsXML()))
	.pipe(replace(/{ICONS}/g, getIconsXML()))
	.pipe(replace(/{SPLASHSCREENS}/g, getSplashscreenXML()))
	.pipe(replace(/{ACCESS_ORIGIN}/g, configs.app.accessOrigin))
	.pipe(replace(/{ORIENTATION}/g, configs.app.orientation))
	.pipe(replace(/{TARGET_DEVICE}/g, configs.app.targetDevice))
	.pipe(replace(/{EXIT_ON_SUSPEND}/g, configs.app.exitOnSuspend))
	
	.pipe(gulp.dest('./' + PHONEGAP_APP_DIR + '/www/'))
});

gulp.task('fonts', function(){
	return gulp.src([
		'./assets-src/bower/snapjs/snap.min.js',
		'./assets-src/bower/bootstrap/dist/fonts/*',
		'./assets-src/bower/ionic/release/fonts/*'
	])
	.pipe(gulp.dest('./' + PHONEGAP_APP_DIR + '/www/fonts/'))
});

gulp.task('create', function(cb){
	runSequence('clean-app', 'create-app', 'install-plugins', cb);
});

gulp.task('clean-app', function(){
	return gulp.src('./' + PHONEGAP_APP_DIR, {read: false})
        .pipe(clean());
})

gulp.task('create-app', shell.task([
  'phonegap create ' + PHONEGAP_APP_DIR
]));

gulp.task('install-plugins', shell.task(phonegapPluginCommands, {
	cwd: PHONEGAP_APP_DIR
}));

gulp.task('serve', shell.task([
  'phonegap serve --port=' + PHONEGAP_DEVELOPER_APP_PORT
], {
	cwd: PHONEGAP_APP_DIR
}));

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
var growl = require('gulp-notify-growl');
var jsValidate = require('gulp-jsvalidate');
var clean = require('gulp-clean');
var shell = require('gulp-shell');

var notify = growl({
  hostname : 'localhost' // IP or Hostname to notify, default to localhost
});

var PHONEGAP_APP_DIR = 'phonegap-app';
var PHONEGAP_DEVELOPER_APP_PORT = 3131;

var phonegapPlugins = [
	'https://github.com/phonegap-build/PushPlugin.git',
	'org.apache.cordova.statusbar',
	'https://github.com/mobimentum/phonegap-plugin-loading-spinner.git',
	'org.apache.cordova.vibration',
	'org.apache.cordova.splashscreen',
	'org.apache.cordova.network-information',
	'org.apache.cordova.globalization',
	'org.apache.cordova.geolocation',
	'org.apache.cordova.inappbrowser',
	'org.apache.cordova.dialogs',
	'org.apache.cordova.device'
];
var phonegapPluginCommands = [];
for(var i = 0; i < phonegapPlugins.length; i++){
  phonegapPluginCommands.push('phonegap plugin add ' + phonegapPlugins[i]);
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
		'notify-me',
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
	.pipe(gulp.dest('./' + PHONEGAP_APP_DIR + '/www/'))
});

gulp.task('notify-me', function(){
	return gulp.src('./react/index.html')
				.pipe(notify({title: 'DONE', message: 'build-app complete!'}));
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
	runSequence('create-app', 'install-plugins', cb);
});

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

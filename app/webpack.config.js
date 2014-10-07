var webpack = require('webpack');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var config = require('./build.configs.js');
module.exports = {
   // target: 'web',
    //debug: true,
    //devtool: 'source-map',
    context: __dirname + '/src',
    watch: false,
    entry: './index.jsx',
    output: {
        path: __dirname + '/' + config.targetDirectory + '/www/js',
        filename: 'bundle.js',
        publicPath: '/',
        chunkFilename: '[chunkhash].js'
    },
    resolve: {
        root: [
            __dirname + '/assets-src/bower/', 
            __dirname +'/node_modules/'
        ],
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['assets-src/bower', 'node_modules'],
        alias: {'snapjs': __dirname + '/assets-src/bower/snapjs/snap.js'}
    },
    module: {
        loaders: [
        //{ test: /\.css/, loader: 'style-loader!css-loader' },
        //{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
        { test: /\.jsx$/, loaders: ['jsx'] },
        //{ test: /\.png/, loader: 'url-loader?limit=100000&mimetype=image/png' },
        //{ test: /\.gif/, loader: 'url-loader?limit=100000&mimetype=image/gif' },
        //{ test: /\.jpg/, loader: 'file-loader' }
        ],
        noParse: /\.min\.js/
    },
    externals: {

    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        //new UglifyJsPlugin()
      //  new webpack.HotModuleReplacementPlugin()
    ]
    };

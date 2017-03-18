var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
});



server.listen(5000);

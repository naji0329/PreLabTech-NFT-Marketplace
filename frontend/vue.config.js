module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    productionSourceMap: false,
    devServer: {
        proxy: 'http://127.0.0.1:5003/api',
        port: 8000,
        disableHostCheck: true
    }
}
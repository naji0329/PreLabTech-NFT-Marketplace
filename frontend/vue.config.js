module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    productionSourceMap: false,
    devServer: {
        proxy: 'http://45.147.228.199:3000/api',
        port: 80
    }
}
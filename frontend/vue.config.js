module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    productionSourceMap: false,
    devServer: {
        proxy: 'http://localhost:5000/api'
    }
}
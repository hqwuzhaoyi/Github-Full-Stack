const webpack = require('webpack')
const withCss = require('@zeit/next-css')
const config = require('./config')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { }
}


module.exports = withBundleAnalyzer(withCss({
    webpack(config) {
        config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
        return config
    },
        publicRuntimeConfig: {
        GITHUB_OAUTH_RUL: config.GITHUB_OAUTH_RUL,
        OAUTH_URL: config.OAUTH_URL
    },
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html'
        },
        browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html'
        }
    }
}))
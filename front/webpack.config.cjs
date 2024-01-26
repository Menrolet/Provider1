const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        main: path.resolve(__dirname, './public/index.js'),
    },
    output: {
        filename: '[name].bandle.js',
        path: path.resolve(__dirname, './public/dist'),
        clean: true,
        assetModuleFilename: 'static/[name][ext][query]',
    },
    optimization: {
        minimize: true,
    },

    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg|ico|webp)$/i,
                type: 'asset',
                generator: {
                    filename: 'img/[name][ext][query]',
                },
            },
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                options: {
                    exclude: [
                        // \\ for Windows, \/ for Mac OS and Linux
                        /node_modules/,
                    ],
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        fallback: {
            'fs': false,
        },
        alias: {
            Static: path.resolve(__dirname, 'public/static/'),
        },
    },
};
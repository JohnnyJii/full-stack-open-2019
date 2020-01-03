const path = require('path');
const webpack = require('webpack');

const config = (env, argv) => {

    const backendUrl = argv.mode === 'production'
    ? "http://localhost:3003"
    : "http://localhost:3003"

    return {
        entry: ['@babel/polyfill', "./src/index.js"],
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "main.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                }
            ]
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000
        },
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backendUrl)
            })
        ]
    }
};

module.exports = config;
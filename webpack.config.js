const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, './dist'),
    },
    resolve: {
        extensions: [".js"],
    },
    mode: 'development',
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
            result.request = result.request.replace(/typeorm/, "typeorm/browser");
        }),
        new webpack.ProvidePlugin({
            // using the wasm version
            'window.initSqlJs': 'sql.js',

            // Uncomment to use the asm.js version
            // 'window.initSqlJs': path.join(__dirname, 'node_modules/sql.js/dist/sql-asm.js'),
        }),
        // Copy the wasm file to the output dir
        new CopyPlugin([
            { from: 'node_modules/sql.js/dist/sql-wasm.wasm' },
        ]),
    ],
    node: {
        fs: 'empty',
    },
};

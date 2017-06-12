var path = require('path');


module.exports = {
    entry: path.resolve(__dirname, '../src/presentation/webpage_entry_point.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../public/js')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.jsx?/i,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        ['transform-react-jsx', {pragma: 'preact.h'}]
                    ]
                }
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        // FIXME: dev server currently not working
        contentBase: path.join(__dirname, '../public'),
        watchContentBase: true,
        stats: 'verbose',
        overlay: true,
        inline: true,
        compress: true,
        clientLogLevel: 'error',
        publicPath: 'public'
    }
};

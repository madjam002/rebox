module.exports = {
  entry: ['babel-polyfill', __dirname + '/index.js'],
  output: {
    path: __dirname + '/static',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    // Maps the 'react-native' import to 'react-native-web'.
    alias: {
      'react-native': 'react-native-web',
    },
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8089,
    contentBase: __dirname + '/public',
    historyApiFallback: true,
    inline: true,
  },
}

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require("./package.json").dependencies;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:3004/', // Adjust port as necessary
  },
  devServer: {
    port: 3004,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
     // favicon: './public/favicon.ico',
    }),
    new ModuleFederationPlugin({
      name: 'notesmf_app',
      remotes: {
       // RemoteApp: 'RemoteApp@http://localhost:3001/remoteEntry.js', // Adjust port and path as necessary
      },
      exposes: {
        './Notesmf_app': './src/components/Notes/NotesContainer.js',
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    }),
  ],
};

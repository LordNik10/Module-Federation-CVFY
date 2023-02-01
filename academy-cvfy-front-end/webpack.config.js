// const HtmlWebPackPlugin = require('html-webpack-plugin');
// const path = require('path');
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// const webpack = require('webpack');
// const deps = require('./package.json').dependencies;

// module.exports = {
//   entry: './src/index.ts',
//   mode: 'development',
//   output: {
//     publicPath: 'http://localhost:8080/',
//   },

//   resolve: {
//     extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.svg'],
//     modules: [path.resolve(__dirname, 'src'), 'node_modules'],
//   },

//   devServer: {
//     port: 8080,
//     open: true,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     },
//   },

//   module: {
//     rules: [
//       {
//         test: /\.m?js/,
//         type: 'javascript/auto',
//         resolve: {
//           fullySpecified: false,
//           alias: {
//             core: path.join(__dirname, 'core'),
//           },
//         },
//       },
//       {
//         test: /\.(css|scss)$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(ts|tsx|js|jsx)$/,
//         exclude: /node_modules/,
//         // use: {
//         loader: 'babel-loader',
//         // },
//         options: {
//           presets: ['@babel/preset-env'],
//           plugins: ['@babel/plugin-proposal-class-properties'], // <--Notice here
//         },
//       },
//       {
//         test: /\.svg$/,
//         loader: 'svg-inline-loader',
//       },
//       {
//         test: /\.env$/,
//         loader: 'webpack-dev-server',
//       },
//     ],
//   },

//   plugins: [
//     new ModuleFederationPlugin({
//       name: 'tsremote',
//       filename: 'remoteEntry.js',
//       remotes: {},
//       exposes: {
//         './AppBar': './src/common/components/AppBar/index.tsx',
//       },
//       shared: {
//         firebase: {
//           singleton: true,
//           version: deps.react,
//         },
//         react: { singleton: true, eager: true, requiredVersion: deps.react },
//         'react-dom': {
//           singleton: true,
//           eager: true,
//           requiredVersion: deps['react-dom'],
//         },
//         'react-router-dom': {
//           singleton: true,
//           eager: true,
//           requiredVersion: deps['react-router-dom'],
//         },
//       },
//     }),
//     new HtmlWebPackPlugin({
//       template: './public/index.html',
//     }),
//     new webpack.ProvidePlugin({
//       process: 'process/browser',
//     }),
//   ],
// };

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
// const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devServer: {
    port: 3003,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // entry: { app: './app.js' },
  // context: path.resolve(__dirname, './src/'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        // aggiungere altrimenti da dei warning
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'cvfy',
      filename: 'remoteEntry.js',
      exposes: {
        // expose each component
        './AppBar': './src/common/components/AppBar',
        './Loader': './src/common/components/Loader',
        './AppDue': './src/App.tsx',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-router-dom'],
        },
        firebase: {
          singleton: true,
          version: deps.react,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

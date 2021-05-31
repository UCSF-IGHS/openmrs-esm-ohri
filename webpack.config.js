const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

const { peerDependencies } = require('./package.json');

const filename = 'openmrs-esm-patient-hts-form-app.js';
const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
  },
};

module.exports = env => ({
  entry: [resolve(__dirname, 'src/set-public-path.ts'), resolve(__dirname, 'src/index.ts')],
  output: {
    filename,
    libraryTarget: 'system',
    path: resolve(__dirname, 'dist'),
    jsonpFunction: 'webpackJsonp_openmrs_esm_patient_hts_form',
  },
  module: {
    rules: [
      {
        parser: {
          system: false,
        },
      },
      {
        test: /\.m?(js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', cssLoader],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', cssLoader, 'sass-loader'],
      },
    ],
  },
  devtool: 'sourcemap',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
  },
  externals: Object.keys(peerDependencies),
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: env && env.analyze ? 'server' : 'disabled',
    }),
    new StatsWriterPlugin({
      filename: `${filename}.buildmanifest.json`,
      stats: {
        all: false,
        chunks: true,
      },
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
});

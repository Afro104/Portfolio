/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
  webpack: (config) => {
    // Disable canvas if it's causing issues
    config.resolve.alias.canvas = false;

    // Ensure Webpack handles ES modules correctly
    config.module.rules.push({
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
      },
    });

    // Add Terser plugin configuration if needed
    if (config.optimization) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            ecma: 2020,
            module: true,
          },
        })
      );
    }

    return config;
  },
};

export default nextConfig;

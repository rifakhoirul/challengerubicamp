module.exports = {
  reactStrictMode: true,
}
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
module.exports = {
  async redirects() {
    return [
      {
        source: '/news',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
// const withCSS = require('@zeit/next-css')

// module.exports = withCSS({
//   webpack: function (config) {
//     config.module.rules.push({
//       test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
//       use: {
//         loader: 'url-loader',
//         options: {
//           limit: 100000,
//           name: '[name].[ext]'
//         }
//       }
//     })
//     return config
//   }
// })

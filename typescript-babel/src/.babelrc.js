module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie 10']
          // browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
        },
        modules: false
      }
    ],
    '@babel/preset-react'
  ]
};

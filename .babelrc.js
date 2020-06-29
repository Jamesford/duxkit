const { NODE_ENV } = process.env

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['ie >= 11'],
        },
        exclude: [
          '@babel/plugin-transform-async-to-generator',
          '@babel/plugin-transform-regenerator',
        ],
        modules: false,
      },
    ],
  ],
  plugins: [
    NODE_ENV === 'test' && '@babel/plugin-transform-modules-commonjs',
  ].filter(Boolean),
}

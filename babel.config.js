module.exports = function(api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        debug: false,
        corejs: 3
      }
    ]
  ]
  const plugins = [
    [`@babel/plugin-transform-runtime`],
    [`@babel/plugin-transform-class-properties`]
  ]
  return {
    presets,
    plugins
  }
}

// linked modules - would fail without this
module.exports = {
    chainWebpack: config => config.resolve.symlinks(false)
  }
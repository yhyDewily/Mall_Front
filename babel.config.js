module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
      [
          "transform-vue-jsx","transform-runtime",[
              "import", {
          "libraryName": "iview",
          "libraryDirectory": "src/components"
        }
      ]
      ]
  ]
}

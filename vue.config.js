module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/avatar": {
        target: "https://shopfreshapi.herokuapp.com/avatar",
        ws: true,
        changeOrigin: true,
      },
    },
    //proxy: "http://localhost:5000",
  },
};

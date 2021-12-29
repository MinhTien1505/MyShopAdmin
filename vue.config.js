module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/avatar": {
        target: "https://shopfreshapi.herokuapp.com",
        ws: true,
        changeOrigin: true,
      },
    },
    //proxy: "http://localhost:5000",
  },
};

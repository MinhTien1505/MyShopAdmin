module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "https://shopfreshapi.herokuapp.com",
  },
};

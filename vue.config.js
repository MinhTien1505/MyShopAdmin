module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "https://shopfreshapi.herokuapp.com",
    //proxy: "http://localhost:5000",
  },
};

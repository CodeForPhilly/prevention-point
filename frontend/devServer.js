const ParcelProxyServer = require("parcel-proxy-server")

// configure the proxy server
// https://github.com/charlieduong94/parcel-proxy-server
const server = new ParcelProxyServer({
  entryPoint: "./public/index.html",
  // makes rebuild in dev less taxing V
  // parcelOptions: {
  //   sourceMaps: false,
  // },
  proxies: {
    "/api": {
      target: "http://127.0.0.1:8000/",
    },
  },
})

server.bundler.on("buildEnd", () => {
  console.log("Build completed!") //eslint-disable-line
})

server.listen(1234, () => {
  console.log("Parcel proxy server has started") //eslint-disable-line
})

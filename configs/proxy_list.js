
module.exports = {
  "/api": {
    target: "http://localhost:3300/",
    changeOrigin: true
  },
  "/executeRemoteControl": {
    target: "http://localhost:7152/",
    changeOrigin: true
  },
  "/getOperationStatus": {
    target: "http://localhost:7152/",
    changeOrigin: true
  }
};
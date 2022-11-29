/* eslint-disable global-require */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require("fs");
const Koa = require("koa");
const path = require("path");
const http = require("http");
const https = require("https");
const proxy = require("koa-proxies");
const { promisify } = require("util");
const koaStatic = require("koa-static");
const cookieParser = require("koa-cookie");
const render = require("./middlewares/render");
const index_page = require("./routers/index_page");

const static_cache_config = {
  "local": 0,
  "test": 1000 * 60 * 24 * 30,
  "prod": 1000 * 60 * 24 * 30,
};

(async () => {
  const app = new Koa();

  app.use(async (context, next) => {
    context.set("Permissions-Policy", `autoplay=(self "https://localhost:8190/")`);
    await next();
  });

  app.use(koaStatic(path.resolve(__dirname, "../assets/"), {
    index: false,
    maxage: static_cache_config[process.env.CHIMERA_RUNTIME]
  }));

  app.use(koaStatic(path.resolve(__dirname, "../public/"), {
    index: false,
    maxage: static_cache_config[process.env.CHIMERA_RUNTIME]
  }));

  /** 本地开发模式需要代理 * */
  if (process.env.CHIMERA_RUNTIME === "local") {
    const proxy_list = require("../configs/proxy_list");
    Object.keys(proxy_list).map((current_proxy_path) => {
      app.use(proxy(current_proxy_path, proxy_list[current_proxy_path]))
    });
  };

  app.use(cookieParser.default());
  app.use(await render());
  app.use(index_page);

  http.createServer(app.callback()).listen(8090);
  https.createServer({
    key: await promisify(fs.readFile)(path.resolve(__dirname, "./cert/localhost-key.pem")),
    cert: await promisify(fs.readFile)(path.resolve(__dirname, "./cert/localhost.pem")),
  }, app.callback()).listen(8190);
})();




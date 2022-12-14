/* eslint-disable global-require */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
const Koa = require("koa");
const path = require("path");
const Redis = require("ioredis");
const proxy = require("koa-proxies");
const koaStatic = require("koa-static");
const { readFile } = require("jsonfile");
const cookieParser = require("koa-cookie");
const bodyParser = require("koa-bodyparser");

const index_page = require("./routers/index_page");
const login_page = require("./routers/login_page");

const static_cache_config = {
  "local": 0,
  "test": 1000 * 60 * 24 * 30,
  "prod": 1000 * 60 * 24 * 30,
};

const app = new Koa();

const cache_data = new Redis({
  port: 26379,
  host: "0.0.0.0",
  keyPrefix: "room:"
});

(async () => {
  const cache_data_path = path.resolve(__dirname, "../cache/cache.json");
  const result = await readFile(cache_data_path);
  await cache_data.del("5");
  result.map(async (element) => {
    await cache_data.rpush("5", JSON.stringify(element));
    await cache_data.expire("5", 60 * 60 * 24 * 30 * 1000);
  });
})();

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

app.use(bodyParser());
app.use(cookieParser.default());
app.use(login_page);
app.use(index_page);

app.listen(18090, () => {
  console.log("server is runing 18090");
});

// http.createServer(app.callback()).listen(8090);
// https.createServer({
//   key: await promisify(fs.readFile)(path.resolve(__dirname, "./cert/localhost-key.pem")),
//   cert: await promisify(fs.readFile)(path.resolve(__dirname, "./cert/localhost.pem")),
// }, app.callback()).listen(8190);




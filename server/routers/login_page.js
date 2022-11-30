const Router = require("@koa/router");

const router = new Router();

router.post("/login", async (context) => {
  console.log(context.request.body);
  context.body = { a: 1 };
});

module.exports = router.routes();
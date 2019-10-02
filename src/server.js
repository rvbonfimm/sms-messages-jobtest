const app = require("./index");
const port = process.env.APP_PORT || 3000;
const ipAddr = process.env.APP_HOST || "localhost";

app.listen(port, () => {
  console.log(
    "Application running at IP " + ipAddr + " and port " + port + "!!!"
  );
});

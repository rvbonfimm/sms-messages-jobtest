const app = require("./index");

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log("Application running at " + port + " port!!!");
});

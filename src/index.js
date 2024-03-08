const express = require("express");
const bodyparser = require("body-parser");
const diagram = require("./diagram");
const cors = require("cors");

const app = express();
const port = 4000;

const whitelist = ["http://localhost:3000"];

const corsDelegate = (req, next) => {
  let opt;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    opt = { origin: true };
  } else {
    opt = { origin: false };
  }
  next(null, opt);
};

app.use(bodyparser.json());
app.use(cors(corsDelegate));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "cs2030s java stack and heap visualiser backend" });
});

app.post("/run-debugger", diagram.runDockerDebugger);

app.listen(port, () => {
  console.log(`app listening on port ${port}...`);
});

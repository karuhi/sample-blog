const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const wrap = fn => (...args) => fn(...args).catch(args[2]);
// urlencodedとjsonは別々に初期化する
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

console.log("Server is online.");
app.post("/microcms", function(req, res, next) {
  axios
    .post(
      "https://sample-blog.microcms.io/api/v1/posts",
      {
        title: req.body.title,
        image: req.body.image,
        imageCaption: req.body.imageCaption,
        contents: req.body.contents
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-WRITE-API-KEY": process.env.WRITE_API_KEY
        }
      }
    )
    .then(response => {
      return res.status(200).send();
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send();
    });

  return res.status(200).send();
});
app.get("/", function(req, res) {
  res.send("HelloWorld");
});

module.exports = {
  path: "/api/",
  handler: app
};

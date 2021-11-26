const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParder = require("body-parser");

//, useCreateIndex: true, useFindAndModify: false
const config = require("./config/key");
//application/x-www-form-urlencoded 분석
app.use(bodyParder.urlencoded({ extended: true }));
//application/json 분석
app.use(bodyParder.json());
app.use(cookieParser());

//mongoDB connect
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //오류 발생 방지
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api/like", require("./routes/like"));
app.use("/api/users", require("./routes/users"));
app.use("/api/post", require("./routes/post"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/message", require("./routes/message"));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Hello! ${port} port!`));

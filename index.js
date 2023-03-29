const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const db = require("./models");

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "This is my API"
  })
});

const { userRouters, authRouters } = require("./routers");
app.use("/user", userRouters);
app.use("/auth", authRouters);

app.listen(process.env.PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`success running server at port: ${process.env.PORT}`);
});

const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = db.User;

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, age } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const result = await user.create({
        username,
        email,
        password: hashPass,
        age
      });
      res.status(200).send({
        status: true,
        message: "Register success",
        data: result
      })
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExist = await user.findOne({
        where: {
          email
        }
      });

      if (!userExist) throw {
        status: false,
        message: `User not found`
      };

      const isValid = await bcrypt.compare(password, userExist.password)

      if (!isValid) throw {
        status: false,
        message: `Wrong password`
      };

      //JSON WEB TOKEN
      const payload = { id: userExist.id, isAdmin: userExist.isAdmin }
      const token = jwt.sign(payload, "JWT", { expiresIn: "5m" });

      res.status(200).send({
        status: true,
        message:  `username ${userExist.username} successfully login`,
        data: userExist,
        token
      })
      
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
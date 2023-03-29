const db = require("../models");
const user = db.User;

module.exports = {
  register: async (req, res) => {
    try {
      const result = await user.create(req.body);
      res.status(200).send({
        status: true,
        data: result
      })
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
const db = require("../models")
const user = db.User;
const { Op } = require("sequelize");
const sequelize = require("sequelize");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const data = await user.findAll({
        // attributes: ["id", "username", "email", "age"],
        // where: {
        //   age: {
        //     [Op.gte]: 25 //gt = greater than, gte = greater then equal
        //   }
        // }
      });
      res.status(200).send({
        status: true,
        data
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getUserById: async (req, res) => {
    try {
      // console.log(req.params.id);
      const data = await user.findAll({
        attributes: ["id", "username", "email", "age"],
        where: {
          id: req.params.id
        }
      });
      res.status(200).send({
        status: true,
        data
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getTotalUser: async (req, res) => {
    try {
      const total = await user.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), "total_user"]]
      })
      res.status(200).send({
        status: true,
        data: total
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  updateUserById: async (req, res) => {
    try {
      // console.log(req.params.id);
      const data = await user.update(
        req.body,
        {where: {
          id: req.params.id
        }
      });
      if (!data[0]) {
        res.status(400).send({
          status: false,
          message: `id ${req.params.id} not found`
        });
      } else {
        res.status(200).send({
          status: true,
          message: `id ${req.params.id} successfully updated`
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  deleteUserById: async (req, res) => {
    try {
      // console.log(req.params.id);
      const data = await user.destroy({
        where: {
          id: req.params.id
        }
      });
      if (!data) {
        res.status(400).send({
          status: false,
          message: `id ${req.params.id} not found`
        });
      } else {
        res.status(200).send({
          status: true,
          message: `id ${req.params.id} successfully deleted`
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
}
const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) throw "token is empty";
    try {
      token = token.split(" ")[1];
      console.log(token);

      const verifiedUser = jwt.verify(token, "JWT");
      if (!verifiedUser) throw "Unauthorized"
      console.log(verifiedUser);

      req.user = verifiedUser;

      next()
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  checkRole: (req, res, next) => {
    if (req.user.isAdmin) return next();
    res.status(400).send("Anda bukan admin");
  }
}
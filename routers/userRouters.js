const router = require("express").Router();
const { userControllers } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/auth")

router.get("/", verifyToken, checkRole, userControllers.getAllUser);
router.get("/total", verifyToken, checkRole, userControllers.getTotalUser);
router.get("/:id", userControllers.getUserById);
router.patch("/:id", userControllers.updateUserById);
router.delete("/:id", userControllers.deleteUserById);

module.exports = router;
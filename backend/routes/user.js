const userController = require("../controllers/userController");
const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController")

//GET ALL USERS
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

//DELETE USER
router.delete("/:id", userController.deleteUser);

module.exports = router;
const express = require("express");
const UserController = require("../../controllers/admin/UserController");

const UserRouter = express.Router();

UserRouter.post("/adminapi/user/login", UserController.login)

module.exports = UserRouter

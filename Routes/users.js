const express = require('express');
const {createUser, getAllUsers, getAUser, updateUser, deleteUser} = require("../Controllers/userController");

const router = express.router();

// create user
router.post("/", createUser);

// get all users
router.get("/users", getAllUsers);

//get a user
router.get("/user/:id", getAUser);

//update user
router.patch("/user/:id", updateUser);

//delete user
router.delete("/user/:id", deleteUser);

module.exports = router;
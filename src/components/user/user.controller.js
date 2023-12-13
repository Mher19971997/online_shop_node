const express = require('express');
const userService = require('./user.service');
const authMiddleware = require('./../../../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.get('/', authMiddleware, userService.getAllUsers);
userRouter.get('/:uuid', authMiddleware, userService.getUserByUuid);

module.exports = userRouter;

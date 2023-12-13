const express = require('express');
const CommentService = require('./comment.service');
const authMiddleware = require("./../../../middleware/auth.middleware");

const commentRouter = express.Router();

const { validateSchema, ajv } = require('../../../libs/validation');

commentRouter.post('/:uuid', authMiddleware, CommentService.createComment);

module.exports = commentRouter;
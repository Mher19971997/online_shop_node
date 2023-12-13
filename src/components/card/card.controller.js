const express = require('express');
const cardRouter = express.Router();
const CardService = require('./card.service');
const authMiddleware = require('./../../../middleware/auth.middleware');

cardRouter.get('/', authMiddleware, CardService.getAllCards);
cardRouter.post('/', authMiddleware, CardService.createCard);

module.exports = cardRouter;
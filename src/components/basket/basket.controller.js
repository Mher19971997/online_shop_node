const express = require('express');
const basketCtr = require('./basket.service');

const basketRouter = express.Router();
const authMiddleware = require("../../../middleware/auth.middleware");
const createSchema = require('./dto/inputs/create.input.json');

const { validateSchema, ajv } = require('../../../libs/validation');

ajv.addSchema(createSchema, 'create');

basketRouter.post('/', authMiddleware, validateSchema('create'), basketCtr.createBasket);
basketRouter.patch('/:uuid', authMiddleware, basketCtr.updateBasket);
basketRouter.get('/', authMiddleware, basketCtr.findAllBasket);
basketRouter.delete('/:uuid', authMiddleware, basketCtr.removeBasket);

module.exports = basketRouter;
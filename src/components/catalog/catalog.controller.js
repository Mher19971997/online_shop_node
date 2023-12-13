const express = require('express');
const CatalogService = require('./catalog.service');

const catalogRouter = express.Router();
const authMiddleware = require("./../../../middleware/auth.middleware");
const Auth = require('./../../../middleware/auth');

const createCatalogSchema = require('./dto/inputs/create-catalog.input.json');

const { validateSchema, ajv } = require('../../../libs/validation');

ajv.addSchema(createCatalogSchema, 'createCatalog');

catalogRouter.post('/', authMiddleware, Auth.authorizeRequest('admin'), validateSchema('createCatalog'),   CatalogService.createCatalog);
catalogRouter.get('/', CatalogService.findAllCatalog);
catalogRouter.get('/:uuid', CatalogService.getOneCatalog);
catalogRouter.delete('/:uuid', CatalogService.removeCatalog);

module.exports = catalogRouter;
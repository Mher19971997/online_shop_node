const express = require('express');
const CategorieService = require('./categorie.service');

const createSchema = require('./dto/inputs/create.input.json');

const categorieRouter = express.Router();

const { validateSchema, ajv } = require('../../../libs/validation');

ajv.addSchema(createSchema, 'createCategorie');

categorieRouter.post('/', validateSchema('createCategorie'), CategorieService.createCategorie);
categorieRouter.get('/', CategorieService.findAllCategorie);
categorieRouter.delete('/:uuid', CategorieService.removeCategorie);

module.exports = categorieRouter;

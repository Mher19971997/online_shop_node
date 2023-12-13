const express = require('express');
const SubCategorieService = require('./subCategorie.service');

const createTypeSchema = require('./dto/inputs/create-subCatrgorie.input.json');

const subCategorieRouter = express.Router();

const { validateSchema, ajv } = require('../../../libs/validation');

ajv.addSchema(createTypeSchema, 'createsubCategorie');

subCategorieRouter.post('/', validateSchema('createsubCategorie'), SubCategorieService.createType);
subCategorieRouter.get('/', SubCategorieService.findAllType);

module.exports = subCategorieRouter;

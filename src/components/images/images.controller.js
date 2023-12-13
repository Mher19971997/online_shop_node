const express = require('express');
const deviceCtr = require('./image.service');


const deviceRouter = express.Router();
const Upload = require('../../../libs/shared/src/uploadFile');

const upload = new Upload('public/images');

deviceRouter.post('/', upload.single('image'), deviceCtr.createImage);
deviceRouter.get('/', deviceCtr.findAllImages);
deviceRouter.get('/:uuid', deviceCtr.findOneImage);
deviceRouter.delete('/:uuid', deviceCtr.removeImage);

module.exports = deviceRouter;

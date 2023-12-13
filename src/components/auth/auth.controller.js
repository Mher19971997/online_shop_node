const express = require('express');
const authCtr = require('./auth.service');

const verifyAndRegisterSchema = require('./dto/inputs/verify-and-register.input.json');
const checkEmailSchema = require('./dto/inputs/check-email.input.json');

const authRouter = express.Router();

const { validateSchema, ajv } = require('../../../libs/validation');

ajv.addSchema(verifyAndRegisterSchema, 'verifyAndRegister');
ajv.addSchema(checkEmailSchema, 'checkEmail');

authRouter.post('/verifyAndRegister', validateSchema('verifyAndRegister'), authCtr.verifyAndRegister);
authRouter.post('/checkEmail', validateSchema('checkEmail'), authCtr.checkEmail);

module.exports = authRouter;

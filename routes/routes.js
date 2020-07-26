const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService');

transactionRouter.get('/', transactionService.findAll);
transactionRouter.get('/:id', transactionService.findOne);
transactionRouter.post('/', transactionService.create);
transactionRouter.put('/:id', transactionService.update);
transactionRouter.delete('/:id', transactionService.remove);

module.exports = transactionRouter;

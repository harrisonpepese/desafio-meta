const { Router } = require('express');
const {
  getAll, ContatoCreate, validChannel, ContatoUpdate, ContatoDelete, getOne, getByIdMiddleware,
} = require('../controller/ContatoController');

class ContatoRouter {
  constructor() {
    this.router = new Router();
    this.instantiateRoutes();
  }

  instantiateRoutes() {
    this.router.param('id', getByIdMiddleware);

    this.router.route('/')
      .get(getAll)
      .post(validChannel, ContatoCreate);

    this.router.route('/:id')
      .get(getOne)
      .put(ContatoUpdate)
      .delete(ContatoDelete);
  }
}

module.exports = new ContatoRouter().router;

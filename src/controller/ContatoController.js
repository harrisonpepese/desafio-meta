const {
  getAll,
  getOne,
  ContatoCreate,
  ContatoUpdate,
  ContatoDelete,
  validChannel,
} = require('../service/ContactService');

class ContactController {
  static async getByIdMiddleware(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return res.status(404).send('Not found');
      req.contato = await getOne(id);
      return next();
    } catch (error) {
      return res.status(500).send('internal server error');
    }
  }

  static async validChannel(req, res, next) {
    const { canal, valor } = req.body;
    if (!canal || !valor) return res.status(401).send('Parâmetros inválidos');
    if (!await validChannel(canal, valor)) return res.status(401).send('o canal ou valor é inválido');
    return next();
  }

  static async getAll(req, res) {
    try {
      const { page, size } = req.query;
      const contatos = await getAll(page, size);
      if (!Array.isArray(contatos) || !contatos.length) return res.status(404).send('Não existe dados');
      return res.status(200).send(contatos);
    } catch (error) {
      return res.status(500).send('internal server error');
    }
  }

  static async getOne(req, res, next) {
    try {
      const { contato } = req;
      if (!contato) return res.status(404).send('Não encontrado');
      return res.status(200).send(contato);
    } catch (error) {
      return res.status(500).send('internal server error');
    }
  }

  static async ContatoCreate(req, res, next) {
    try {
      const {
        nome, canal, valor, obs,
      } = req.body;
      if (!nome || !canal || !valor) return res.status(401).send('Parametros invalidos');
      const contato = await ContatoCreate(nome, canal, valor, obs);
      return res.status(201).send(contato);
    } catch (error) {
      return res.status(401).send('Parametros invalidos');
    }
  }

  static async ContatoUpdate(req, res, next) {
    try {
      const { contato } = req;
      if (!contato) return res.status(404).send('Não encontrado');
      if (!req.body) return res.status(401).send('Parametros invalidos');
      const contatoUpdated = await ContatoUpdate(contato, req.body);
      return res.status(204).send(contatoUpdated);
    } catch (error) {
      return res.status(401).send('Parametros invalidos');
    }
  }

  static async ContatoDelete(req, res, next) {
    try {
      const { contato } = req;
      if (!contato) return res.status(401).send('Parametros invalidos');
      const contadoDeleted = await ContatoDelete(contato);
      if (!contadoDeleted) return res.status(404).send('Não encontrado');
      return res.status(204).send('deleted');
    } catch (error) {
      return res.status(500).send('internal server error');
    }
  }
}

module.exports = ContactController;

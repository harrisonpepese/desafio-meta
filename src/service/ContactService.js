const Model = require('../model/Contato');

class ContactService {

  static async getAll(page = 0, size = 10) {
    return Model.find().limit(size).skip(page * size);
  }

  static async getOne(id) {
    return Model.findOne({ id });
  }

  static async ContatoCreate(nome, canal, valor, obs) {

    return Model.create({
      nome, canal, valor, obs,
    });
  }

  static async ContatoUpdate(model, update) {
    Object.assign(model, update);
    return Model.save();
  }

  static async ContatoDelete(model) {
    return Model.remove(model);
  }
}
module.exports = ContactService;

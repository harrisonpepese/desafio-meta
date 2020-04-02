const Model = require('../model/Contato');

const VALID_CHANNELS = ['fixo', 'celular', 'email'];
const { validEmail, validPhone } = require('../utils/validators');

class ContactService {

  static async validChannel(canal, value) {
    if (!VALID_CHANNELS.includes(canal.toLowerCase())) return false;
    if (canal.toLowerCase === VALID_CHANNELS[2]) return validEmail(value);
    return validPhone(value);
  }

  static async getAll(page = 0, size = 10) {
    page = Number.parseInt(page);
    size = Number.parseInt(size);
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
    if (!await this.validChannel(model.canal, model.valor)) throw new Error('invalid params');
    return model.save();
  }

  static async ContatoDelete(model) {
    return Model.remove(model);
  }
}
module.exports = ContactService;

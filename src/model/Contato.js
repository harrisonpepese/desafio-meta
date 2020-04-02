const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const contato = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  nome: { type: String, required: true },
  canal: { type: String, enum: ['email', 'celular', 'fixo'], required: true },
  valor: { type: String, required: true },
  obs: { type: String },
});

contato.plugin(AutoIncrement, {id:'id_sequ',inc_field: 'id' });

module.exports = model('Contato', contato);

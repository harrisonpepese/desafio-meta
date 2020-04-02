const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('./db/MemoryMongoDb');
const contactRoutes = require('./route/ContatoRoutes');

class DesafioMeta {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.use(
      bodyparser.urlencoded({
        extended: false,
      }),
    );
    this.app.use(
      bodyparser.json({
        limit: '50mb',
      }),
    );
    this.app.use(cors());
    this.app.use((err, req, res, next) => {
      res.status(500).send('error');
    });
  }

  routes() {
    this.app.use('/', contactRoutes);
  }
}
exports.default = new DesafioMeta().app;

const ContactService = require('../service/ContactService');

const names = ['joão', 'maria', 'felipe', 'jose', 'mariana', 'enzo', 'valentina', 'gabriela', 'paula'];
const emailHost = ['@gmail.com', '@outlook.com', '@globo.com.br'];
const canais = ['celular', 'fixo', 'email'];

module.exports = () => {
  for (let i = 0; i < 20; i += 1) {
    const nameIndex = Math.floor((names.length) * Math.random());
    const canalIndex = Math.floor((emailHost.length) * Math.random());
    ContactService.ContatoCreate(
      names[nameIndex],
      canais[canalIndex],
      canalIndex === 2
        ? `${names[nameIndex]}${emailHost[Math.floor((emailHost.length) * Math.random())]}`
        : `21${Math.floor(Math.random() * 1000000000)}`,
    );
  }
};

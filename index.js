const { port } = require('./src/env');
require('./src/app').default.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server listen on port: ${port}`);
});

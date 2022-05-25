const app = require('./app');
require('dotenv').config();

const productsRouter = require('./routers/productsRouter');

app.use('/products', productsRouter);

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

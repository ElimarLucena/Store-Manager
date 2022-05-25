const app = require('./app');
require('dotenv').config();

const productsRouter = require('./routers/productsRouter');

app.use('/products', productsRouter);

// app.use((err, _req, res, _next) => {
//   res.status(err.statusCode || 500).json({ message: err.message });
// });

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

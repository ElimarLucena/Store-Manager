const app = require('./app');
require('dotenv').config();

const productsRouter = require('./routers/productsRouter');

const salesRouter = require('./routers/salesRouter');

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

// app.use((err, _req, res, _next) => {
//   res.status(err.statusCode || 500).json({ message: err.message });
// });

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

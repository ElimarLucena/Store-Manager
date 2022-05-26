const express = require('express');
// require('express-async-errors'); 

const app = express();
app.use(express.json());

const productsRouter = require('./routers/productsRouter');

const salesRouter = require('./routers/salesRouter');

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use((err, _req, res, _next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

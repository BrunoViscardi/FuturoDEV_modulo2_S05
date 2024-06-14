const express = require('express');

const livrosRoutes = require('./src/routes/livros.routes');
const auditoriosRoutes = require('./src/routes/auditorios.routes');
const leitoresRoutes = require('./src/routes/leitores.routes');
const instrumentosRoutes = require('./src/routes/instrumentos.routes');

const app = express();
const port = 3000;

app.use(express.json()); // Fala para servidor que vai receber json como contéudo

app.use('/livros', livrosRoutes)
app.use('/auditorios', auditoriosRoutes)
app.use('/leitores', leitoresRoutes)
app.use('/instrumentos', instrumentosRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

const {Router} = require('express');

const LivroController = require('../controllers/LivroController');

const livrosRoutes = new Router()

const livroController = new LivroController()

livrosRoutes.get('/', livroController.listar);

module.exports = livrosRoutes
const Database = require("../database/connection");

class LivroController  extends Database {

    /* coloque aqui seus métodos de crud */

    async listar(request, response) {
        return response.json({message: 'listando'})
    }
}

module.exports = LivroController
const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({
            user: 'seu_usuario',     
            host: 'localhost',        
            database: 'pet_database',  
            password: 'sua_senha',     
            port: 5432,                
        });
    }
}

module.exports = Database;
const { Router } = require('express')
const { Pool } = require('pg')

const instrumentosRoutes = new Router()

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'livraria'
})



/* Cadastrar - Body (corpo) */
instrumentosRoutes.post('/', async (request, response) => {
    try {
        const dados = request.body

        if (!dados.nome || !dados.tipo || !dados.situacao) {
            return response
                .status(400)
                .json({ mensagem: "O nome, o tipo, e situacao são obrigatórios" })
        }

        await conexao.query(
            `INSERT INTO instrumentos
             (
                nome,
                tipo,
                situacao
            )
            values
            (
                $1,
                $2,
                $3
            )
        `, [dados.nome, dados.tipo, dados.situacao]);

        console.log(dados)

        response.status(201).json({ mensagem: 'Criado com sucesso' })
    } catch (error) {
        console.log(error)
        response.status(500).json({ mensagem: 'Não foi possível cadastrar' })
    }
})


//Listar todos ou somente um com base no nome do instrumento
instrumentosRoutes.get("/", async (request, response) => {
    const dados = request.query
    console.log(dados)

    if (dados.nome) {
        const instrumentos = await conexao.query("SELECT * from instrumentos where nome ilike $1", [`%${dados.nome}%`])
        response.status(200).json(instrumentos.rows)
    } else {
        const instrumentos = await conexao.query("SELECT * from instrumentos")
        response.status(200).json(instrumentos.rows)
    }
})


//Atualizar
instrumentosRoutes.put("/:id", async (request, response) => {
    try {
        const dados = request.body;
        const id = request.params.id;

        // Verifica se o instrumento existe
        const dadosDoInstrumento = await conexao.query("SELECT * FROM instrumentos WHERE id = $1", [id]);

        if (dadosDoInstrumento.rows.length === 0) {
            return response.status(404).json({ mensagem: 'Instrumento não encontrado' });
        }

        // Atualiza o instrumento
        await conexao.query(`
            UPDATE instrumentos 
            SET 
                nome = $1,
                tipo = $2,
                situacao = $3
            WHERE id = $4
            `,
            [
                dados.nome || dadosDoInstrumento.rows[0].nome,
                dados.tipo || dadosDoInstrumento.rows[0].tipo,
                dados.situacao || dadosDoInstrumento.rows[0].situacao,
                id
            ]
        );

        response.json({ mensagem: 'Atualizado com sucesso' });
    } catch (error) {
        console.log(error);
        response.status(500).json({ mensagem: 'Não foi possível atualizar o instrumento' });
    }
})



// Deletar
instrumentosRoutes.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id
        const instrumento = await conexao.query("SELECT * from instrumentos where id = $1", [id])

        if (instrumento.rows.length === 0) {
            return response.status(404).json({ mensagem: 'Não foi encontrado um instrumento com id' })
        }

        await conexao.query("DELETE FROM instrumentos where id = $1", [id])

        response.status(204).send()

    } catch (error) {
        console.log(error)
        response.status(500).json({ mensagem: 'Não foi possível deletar' })

    }


})



module.exports = instrumentosRoutes
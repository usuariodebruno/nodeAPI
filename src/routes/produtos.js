const express = require('express');
const router = express.Router();
const { sql } = require('../postgres')// Não estou exportado o arquivo inteiro, apenas o pools 

// RETORNA TODOS PRODUTOS 
router.get('/', async (req, res, next) => {
    try {
        const resultado = await sql`
            SELECT * FROM produtos;
        `; 

        res.status(200).send({response: resultado});
        
    } catch (error) {
        res.status(500).send({
            erro: error.message,
        });
    }
});

// INSERE UM PRODUTO
router.post('/', async (req, res, next) => {

    const {nome, preco } = req.body; 

    try {
        const resultado = await sql`
            INSERT INTO produtos (nome, preco)
            VALUES (${nome}, ${preco})
            RETURNING id_produto
        `;

        res.status(201).send({
            mensagem: 'Produto inserido com sucesso!',
            id_produto: resultado[0].id_produto,
        });

    } catch (error) {
        // Enviando uma resposta mais clara sobre o erro
        res.status(500).send({
            mensagem: 'Erro ao inserir produto',  // Mensagem genérica, sem expor dados confidenciais
            erro: error.message,  // Envia a mensagem do erro (sem stack trace)
            codigo_erro: 'PRODUTO_INSERCAO_FALHA',  // Código de erro para identificação
        });

    }
    
});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', async (req, res, next) => {
    var id = req.params.id_produto;
    try {
        const resultado = await sql`
            SELECT * FROM produtos WHERE id_produto = ${id};
        `; 
        res.status(200).send({response: resultado});
        
    } catch (error) {
        res.status(500).send({
            erro: error.message,
        });
    }
});

// ATUALIZA UM PRODUTO
router.patch('/', async  (req, res, next) => {

    try {
        const resultado = await sql`
            UPDATE produtos
            SET nome = ${req.body.nome},
                preco = ${req.body.preco}
            WHERE id_produto = ${req.body.id_produto}
            RETURNING id_produto
        `;

        res.status(202).send({
            mensagem: 'Produto atualizado com sucesso!',
            id_produto: resultado[0].id_produto,
        });
        
    } catch (error) {        
        res.status(500).send({
            mensagem: 'Erro ao atualizar produto',  // Mensagem genérica, sem expor dados confidenciais
            erro: error.message,  // Envia a mensagem do erro (sem stack trace)
            codigo_erro: 'PRODUTO_ATUALIZACAO_FALHA',  // Código de erro para identificação
        });
    }
});

// DELETA UM PRODUTO
router.delete('/:id_produto', async(req, res, next) => {
    const id = req.params.id_produto
    try {
        const resultado = await sql`
            DELETE FROM produtos
            WHERE id_produto = ${id}
        `;

         // Verifica se a exclusão ocorreu
         if (resultado.length === 0) {
            return res.status(404).send({
                mensagem: `Produto com id ${id} não encontrado.`,
                codigo_erro: 'PRODUTO_NAO_ENCONTRADO',
            });
        }

        res.status(202).send({
            mensagem: `Produto ${id} excluido com sucesso!`
        });
    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao excluir produto',  
            erro: error.message,  
            codigo_erro: 'PRODUTO_DELETE_FALHA',  
        });
    }
});

module.exports = router;
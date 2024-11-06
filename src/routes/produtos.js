const express = require('express');
const router = express.Router();

// RETORNA TODOS PRODUTOS 
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de produtos',
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de produtos',
    });
});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
    var id = req.params.id_produto;
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial'
        });
    } else {
        res.status(200).send({
            mensagem: 'Usando o GET de um produto exclusivo - ID: ' + id

        });
    }
});

// ATUALIZA UM PRODUTO
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de produtos',
    });
});

// DELETA UM PRODUTO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de produtos',
    });
});

module.exports = router;
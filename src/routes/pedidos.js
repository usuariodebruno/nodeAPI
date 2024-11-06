const express = require('express');
const router = express.Router();

// RETORNA TODOS PEDIDOS 
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de pedidos',
    });
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {

    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade,
    }

    res.status(201).send({
        mensagem: 'Pedido criado com sucesso!',
        pedidoCriado: pedido, 
    });
});

// RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) => {
    var id = req.params.id_pedido;
    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial'
        });
    } else {
        res.status(200).send({
            mensagem: 'Usando o GET de um pedido exclusivo - ID: ' + id

        });
    }
});

// DELETA UM PEDIDO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de pedidos',
    });
});

module.exports = router;
const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos );

// Quando não encontra a rota, entra aqui: 
app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada')
    erro.status = 404;
    next(erro);
});

// Tratamento de erro 
app.use((error, req, res, next,) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message,
            status: error.status
        }
    });    
});

module.exports = app;
const expressApp = require('express');
const mongoDB = require('mongoose');
const expressParser = require('body-parser');

const myApp = expressApp();

// Utilizar o body-parser para lidar com os dados codificados da URL
myApp.use(expressParser.urlencoded({ extended: true }));

// Conectar com MongoDB
mongoDB.connect('mongodb://localhost:27017/tecrec', { useNewUrlParser: true, useUnifiedTopology: true });

// Definição de Modelo Cliente
const clienteSchema = new mongoDB.Schema({
    nome: String,
    email: { type: String, required: true },
    senha: { type: String, required: true }
});
const Cliente = mongoDB.model('Cliente', clienteSchema);

// Definição de Modelo Fatura
const faturaSchema = new mongoDB.Schema({
    numeroNota: { type: String, required: true },
    dataEmissao: Date,
    descricaoItem: String,
    valorUnitario: Number,
    quantidade: Number
});
const Fatura = mongoDB.model('Fatura', faturaSchema);

// Endpoint para registro de Cliente
myApp.post('/clientes', async (request, response) => {
    const novoCliente = new Cliente({
        nome: request.body.nome,
        email: request.body.email,
        senha: request.body.senha
    });

    try {
        await novoCliente.save();
        response.status(201).send(novoCliente);
    } catch (erro) {
        response.status(500).send(erro);
    }
});

// Endpoint para registro de Fatura
myApp.post('/faturas', async (request, response) => {
    const novaFatura = new Fatura({
        numeroNota: request.body.numeroNota,
        dataEmissao: request.body.dataEmissao,
        descricaoItem: request.body.descricaoItem,
        valorUnitario: request.body.valorUnitario,
        quantidade: request.body.quantidade
    });

    try {
        await novaFatura.save();
        response.status(201).send(novaFatura);
    } catch (erro) {
        response.status(500).send(erro);
    }
});

// Iniciar servidor
const SERVER_PORT = 8080;
myApp.listen(SERVER_PORT, () => {
    console.log(`Aplicativo executando na porta ${SERVER_PORT}`);
});

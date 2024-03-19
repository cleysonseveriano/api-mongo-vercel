const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();
app.use(cors());
const app = express();

app.use(express.json());

const Produto = mongoose.model('Produto', { 
    nome: String, 
    preco: Number
});

app.get('/', async (req, res) => {
    const produtos = await Produto.find();
    return res.send(produtos);
});
  
app.post('/', async (req,res) => {
    const { nome, preco } = req.body
    const produto = new Produto({
        nome,
        preco
    });
    await produto.save();
    return res.send(produto);
});

app.delete('/:id', async (req,res) => {
    const { id } = req.params
    const produto = await Produto.findByIdAndRemove(id);
    return res.send(produto);
});

app.put('/:id', async (req,res) => {
    const { id } = req.params
    const { nome, preco } = req.body
    const produto = await Produto.findByIdAndUpdate(id, {
        nome, 
        preco
    });

    return res.send(produto);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        const MONGO_URL = process.env.MONGOOSE_CONNECTION;
        await mongoose.connect(MONGO_URL);     
        console.log(`Conexão bem estabelecida com sucesso`);
    } catch (error) {
        console.error('Erro ao iniciar o servidor: ', error);
    }
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

const Produto = mongoose.model('Produto', { 
    nome: String, 
    preco: Number
});

const Bebida = mongoose.model('Bebida', { 
    nome: String, 
    preco: Number,
    ml: Number
});

// ROTAS PRODUTOS
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


// ROTAS BEBIDAS
app.get('/bebidas', async (req, res) => {
    try {
        const bebidas = await Bebida.find();
        return res.json(bebidas);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar bebidas procuradas' });
    }
})
  
app.post('/bebidas', async (req,res) => {
    const { nome, preco, ml } = req.body;
    try {
        const bebida = new Bebida({
            nome,
            preco,
            ml
        });
        await bebida.save();
        return res.json(bebida);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao adicionar bebida' });
    }
});

app.delete('/bebidas/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const bebida = await Bebida.findByIdAndRemove(id);
        if (!bebida) {
            return res.status(404).json({ error: 'Bebida não encontrada' });
        }
        return res.json(bebida);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao excluir bebida' });
    }
});

app.put('/bebidas/:id', async (req,res) => {
    const { id } = req.params;
    const { nome, preco, ml } = req.body;
    try {
        const bebida = await Bebida.findByIdAndUpdate(id, {
            nome,
            preco,
            ml
        }, { new: true });
        if (!bebida) {
            return res.status(404).json({ error: 'Bebida não encontrada' });
        }
        return res.json(bebida);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar bebida' });
    }
});


// SERVIDOR
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
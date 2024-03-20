const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


require('dotenv').config();

app.use(cors());
app.use(express.json());

const Bebida = mongoose.model('Bebida', { 
    nome: String, 
    preco: Number,
    ml: Number
});

app.get('/bebidas', async (req, res) => {
    try {
        const bebidas = await Bebida.find();
        return res.json(bebidas);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar bebidas' });
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

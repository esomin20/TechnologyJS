const express = require('express');
const app = express();

// Middleware pour parser les requêtes en JSON
app.use(express.json());

let items = [];

// Endpoint POST pour ajouter un nouvel élément
app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).send('Item ajouté avec succès');
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const item = items.find(i => i.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items[index] = updatedItem;
        res.send('Item updated');
    } else {
        res.status(404).send('Item not found');
    }
});

app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.send('Item deleted');
    } else {
        res.status(404).send('Item not found');
    }
});


app.listen(3000, () => {
    console.log('Le serveur est démarré sur le port 3000');
});

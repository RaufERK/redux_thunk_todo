const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wolves2021', { useNewUrlParser: true, useUnifiedTopology: true });

const Todo = mongoose.model('Todo', { label: String });

app.use(cors());
app.use(express.json())
app.use(express.urlencoded())

app.route('/')
  .get(async (req, res) => {
    const list = await Todo.find({})
    res.json({ list })
  }).post(async (req, res) => {
    // записываем в базу то что пришло с фронта
    const newItem = new Todo(req.body);
    await newItem.save();
    //посылаем лист тудушек на фронт
    res.redirect('/')
  }).delete(async (req, res) => {
    const { id } = req.body;
    await Todo.findByIdAndDelete(id)
    const list = await Todo.find({})
    res.json({ list })
  })


app.listen(8080, () => console.log('Hello from backEnd!!!'))

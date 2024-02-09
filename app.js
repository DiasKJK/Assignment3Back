// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/news', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

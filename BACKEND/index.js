const connectToMongo = require('./db.js')
const express = require('express');
const cors=require('cors');

const port = 5000;
app = express()
app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
    res.send("HEllo");
})
app.get('/login', (req, res) => {
    res.send("Welcome to the login page");
})

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

app.listen(port, () => {
    console.log(`Connected to the port ${port} for now`);
})

connectToMongo();
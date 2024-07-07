require("./conection")
const express = require('express');
const cors = require('cors')
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send("Hello World")
});

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
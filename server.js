const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.set('view engine','ejs');
//Grabs files from our static directory
app.use(express.static('public'));

app.get('/',(req,res) => {
    res.sendFile('index.html');
})

app.get('/finnishvirtual',async (req,res) => {
    const url = 'http://stats.virtualpilots.fi:8000/static/output.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
})

app.listen(PORT,() => {
    console.log(`Server Running on PORT ${PORT}`);
})


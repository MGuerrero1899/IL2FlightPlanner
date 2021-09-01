const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.set('view engine','ejs');
//Grabs files from our static directory
app.use(express.static(path.join(__dirname,'public')));
const publicPath = path.join(__dirname, 'public')

app.get('/',(req,res) => {
    res.sendFile(publicPath + '/index.html');
})
app.get('/planeindex',(req,res) => {
    res.sendFile(publicPath + '/html/planeindex.html');
})
app.get('/contact',(req,res) => {
    res.sendFile(publicPath + '/html/contact.html');
})
app.listen(PORT,() => {
    console.log(`Server Running on PORT ${PORT}`);
})


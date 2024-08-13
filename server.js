require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();

//////MidleWere Section/////
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/crud', async(req, res) => {
    res.send('<h1>CRUD APP</h1>')
})

//have the express application running on our PORT 
app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
})
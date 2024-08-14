require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const Trailer = require('./models/trailers')

//////MidleWere Section/////
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/crud', async(req, res) => {
    res.send('<h1>CRUD APP</h1>')
})

app.get('/sptrailers/new', (req, res) => {
    res.render('new.ejs')
});

app.get('/sptrailers', async (req, res) => {
    try {

        //this is the data from the mongo db
        let pendingTrailerJobs = await Trailer.find({});

        //render the show.ejs page. 
        // and PASS to show.ejs data. 
        //this data is { k: listOfThingsTodo }

        // we can put our console logs here. like so
        // console.log(listOfThingsTodo);
        res.render('index.ejs', { pendingTrailerJobs });
    } catch (err) {
        res.status(400).json(err);
    }
});

app.post('/sptrailers', async (req, res) => {
    try {
        //transform isComplete from string  to be a boolean 
        if(req.body.isComplete  === 'on'){
            req.body.isComplete = true;
        }else{
            req.body.isComplete = false;
        }
        //send this request body to the db save it and then im going to redirect to the home page
        await Trailer.create(req.body); //add to the db
        console.log(req.body)
        res.redirect('/sptrailers') //then redirect to the /todo
        
    } catch (err) {
        res.status(400).json(err);
    }
});

app.get('/sptrailers/:id', async (req, res) => {
    const selectedTrailer = await Trailer.findById(req.params.id);
    res.render('show.ejs', { selectedTrailer });
});

app.delete('/sptrailers/:id', async (req, res) => {
    
    await Trailer.findByIdAndDelete(req.params.id)
    res.redirect('/sptrailers');
});

app.put('/sptrailers/:id', async (req, res) => {
    try {
        if (req.body.isComplete === 'on') {
            req.body.isComplete = true;
        } else {
            req.body.isComplete = false;
        }
        
        await Trailer.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/sptrailers')

    } catch (err) {
        res.status(400).json(err);
    }
   
});

//have the express application running on our PORT 
app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
})
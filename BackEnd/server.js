const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const strConnection = 'mongodb+srv://admin:admin@cluster0.cmmhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(strConnection);
}

const movieSchema = new mongoose.Schema({
    Title: String,
    Year: String,
    Poster: String
});

const movieModel = mongoose.model('movie', movieSchema);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/movies', (req,res)=>{
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);

    movieModel.create({
        Title: req.body.Title,
        Year: req.body.Year,
        Poster: req.body.Poster
    });

    res.send('Data Sent to Server!')
})

app.get('/api/movies/:id', (req, res)=> {
    console.log(req.params.id);

    movieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})

app.get('/api/movies', (req, res) => {
         
        //"Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"   
        //"Poster": "https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
        
        movieModel.find((err, data)=>{
            res.json(data);
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
// server.js
//Made using the tutorial https://zellwk.com/blog/crud-express-mongodb/ up to the section CRUD - UPDATE
//just prints to the console on start up
console.log('May Node be with you')

//essentially imports
const express = require('express');
const bodyParser= require('body-parser');
var Character = require('./character');

const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://acarlso1:FSSZfskcR6EPoMzq@sw-dnd.s9vcx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connection = MongoClient.connect(connectionString, { useNewUrlParser: true });


//const server = http.createServer(app);

//app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname,'./views')));


//Sets up the EJS engine to work the non-static stuff
app.set('view engine', 'ejs')

app.use(express.static('assets'));
//Start up the local server
app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
});

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('DnDRules')
    const racesCollection = db.collection('Races')
    const classCollection = db.collection('Classes')

    //const Bob = new Character("Bob", 6, "Human", "Sorcerer", 10,11,12,13,14,15)
    // console.log("Bob: ")
    // console.log(Bob.hp)    
    //const Sally = new Character("Sally", 3, "Dwarf", "Ranger", 15,15,15,15,15,15)
    // console.log("Sally :" + Sally.str)

    
      //Render Method
      app.get('/', (req, res) => {
        db.collection('Races').find().toArray()
          .then(results => {
            res.render('generateCharacter.ejs', { races: results })
            console.log(racesCollection)
          })
          .catch(/* ... */)
          //res.render('display.ejs', {Character: Bob , Character2: Sally});
      })

      app.post('/display', (req,res) => {
        console.log(req.body)
        const callback = (newChar) => res.render('display.ejs', {Character: newChar});
        const newChar = new Character(callback, req.body.charName, req.body.level, req.body.genderDrop, req.body.raceDrop, req.body.classDrop, req.body.alignDrop, req.body.str,req.body.dex,req.body.con,req.body.int,req.body.wis,req.body.cha);
      })
                  
  })
  .catch(error => console.error(error))

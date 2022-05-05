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


//Sets up the EJS engine to work the non-static stuff
app.set('view engine', 'ejs')

//Start up the local server
app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
})  

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('DnDRules')
    const racesCollection = db.collection('Races')
    const classCollection = db.collection('Classes')

    const Bob = new Character("Bob", 6, "Human", "Sorcerer", 10,11,12,13,14,15)
    // console.log("Bob: ")
    // console.log(Bob.hp)    
    const Sally = new Character("Sally", 3, "Dwarf", "Ranger", 15,15,15,15,15,15)
    // console.log("Sally :" + Sally.str)

    //Redirect back to '/'
    // app.post('/races', (req, res) => {
    //     racesCollection.insertOne(req.body)
    //       .then(result => {
    //         console.log(result)
    //         res.redirect('/')
    //     })
    //       .catch(error => console.error(error))
    //   })

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
        const newChar = new Character(req.body.charName, 1, req.body.raceDrop, req.body.classDrop, req.body.str,req.body.dex,req.body.con,req.body.int,req.body.wis,req.body.cha);
        setTimeout(function() {
          console.log("condense post request");
          res.render('display.ejs', {Character: newChar});
        }, 3000);
      })

      // app.get('/display', (req, res) => {
      //   db.collection('Races'.find().toArray()
      //     .then(results => {
      //       const raceName = "Human";

      //     }))
      // })
                  
  })
  .catch(error => console.error(error))

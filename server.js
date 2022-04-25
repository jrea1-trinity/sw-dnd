// server.js
//Made using the tutorial https://zellwk.com/blog/crud-express-mongodb/ up to the section CRUD - UPDATE
//just prints to the console on start up
console.log('May Node be with you')

//essentially imports
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


//Sets up the EJS engine to work the non-static stuff
app.set('view engine', 'ejs')

//Start up the local server
app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
})  

app.use(bodyParser.urlencoded({ extended: true }))

const connectionString = 'mongodb+srv://acarlso1:FSSZfskcR6EPoMzq@sw-dnd.s9vcx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('DnDRules')
    const racesCollection = db.collection('Races')

    let Character = class Character1 {
      constructor(raceName, str, dex, con, int, wis, cha) {
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.int = int;
        this.wis = wis;
        this.cha = cha;
        var self = this;
        this.raceName = raceName;
        racesCollection.findOne({}, {name: raceName}, function(err, result){
          if (err) throw err
          self.race = result;
          self.str += result.asi[0];
          self.dex += result.asi[1];
          self.con += result.asi[2];
          self.int += result.asi[3];
          self.wis += result.asi[4];
          self.cha += result.asi[5];
          console.log("local change: ");
          console.log(self.str)
          })
        this.strBon = this.str / 2 - 5;
        this.dexBon = this.dex / 2 - 5;
        this.conBon = this.con / 2 - 5;
        this.intBon = this.int / 2 - 5;
        this.wisBon = this.wis / 2 - 5;
        this.chaBon = this.cha / 2 - 5;
      }
    }
    const Bob = new Character("Human", 18,10,10,10,10,10)
    console.log("Bob: ")
    console.log(Bob.str)    
    const Sally = new Character("Dwarf", 15,15,15,15,15,15)
    console.log("Sally :" + Sally.str)

    //Redirect back to '/'
    app.post('/races', (req, res) => {
        racesCollection.insertOne(req.body)
          .then(result => {
            // console.log(result)
            res.redirect('/')
        })
          .catch(error => console.error(error))
      })

      //Render Method
      app.get('/', (req, res) => {
        //db.collection('Races').find().toArray()
          //.then(results => {
            //res.render('display.ejs', { races: results })
            //console.log(racesCollection)
          //})
          //.catch(/* ... */)
          res.render('display.ejs', {Character: Bob , Character2: Sally});
      })

      app.get('/display', (req, res) => {
        db.collection('Races'.find().toArray()
          .then(results => {
            const raceName = "Human";

          }))
      })
                  
  })
  .catch(error => console.error(error))

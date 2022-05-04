// server.js
//Made using the tutorial https://zellwk.com/blog/crud-express-mongodb/ up to the section CRUD - UPDATE
//just prints to the console on start up
console.log('May Node be with you')

//essentially imports
const express = require('express');
const bodyParser= require('body-parser');
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


// Race = class {
//   constructor(raceName) {
//     this.raceName = raceName
//     this.strMod = 0
//     this.dexMod = 0
//     this.conMod = 0
//     this.intMod = 0
//     this.wisMod = 0
//     this.chaMod = 0
//   }
//   getRace(raceName, callback) {
//     var self = this
//     connection.then(client => {
//       const racesCollection = client.db('DnDRules').collection('Races');
//         console.log("connected to Races")
//         console.log("looking for: ", raceName)
//         racesCollection.findOne({race: raceName}, function(err, result) {
//           if (err) throw err;
//           console.log("Found a race")
//           // console.log(result)
//           console.log(result.race)
//           self.raceName = result.race
//           self.strMod = result.asi[0]
//           self.dexMod = result.asi[1]
//           self.conMod = result.asi[2]
//           self.intMod = result.asi[3]
//           self.wisMod = result.asi[4]
//           self.chaMod = result.asi[5]
//         })
//     })
//   }
// }

Character = class {
  constructor(raceName, className, str, dex, con, int, wis, cha){
    var self = this
    connection.then(client => {
      const racesCollection = client.db('DnDRules').collection('Races')
      console.log("looking for race: ", raceName)
      racesCollection.findOne({race: raceName}, function(err, result) {
        if (err) throw err;
        console.log("race found: ", result.race)
        self.raceName = result.race
        self.str = str + result.asi[0]
        self.dex = dex + result.asi[1]
        self.con = con + result.asi[2]
        self.int = int + result.asi[3]
        self.wis = wis + result.asi[4]
        self.cha = cha + result.asi[5]
        self.strBon = self.str / 2 - 5
        self.dexBon = self.dex / 2 - 5
        self.conBon = self.con / 2 - 5
        self.intBon = self.int / 2 - 5
        self.wisBon = self.wis / 2 - 5
        self.chaBon = self.cha / 2 - 5
      })

      
    })
    // this.race = new Race("NoRace");
    // this.race.getRace(raceName)

    // console.log("race name in character class: ", this.race.raceName)
  }
}

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('DnDRules')
    const racesCollection = db.collection('Races')
    const classCollection = db.collection('Classes')

    // let Character = class Character1 {
    //   constructor(raceName, className, str, dex, con, int, wis, cha) {
    //     this.str = str;
    //     this.dex = dex;
    //     this.con = con;
    //     this.int = int;
    //     this.wis = wis;
    //     this.cha = cha;
    //     var self = this;
    //     this.raceName = raceName;

    //     // const testFolder = './Races/';
    //     // const fs = require('fs');

    //     // fs.readdir(testFolder, (err, files) => {
    //     //   files.forEach(file => {
    //     //     console.log(file);
    //     //   });
    //     // });
    //     racesCollection.findOne({}, {race: raceName}, function(err, result){
    //       if (err) throw err
    //       self.race = result;
    //       self.str += result.asi[0];
    //       self.dex += result.asi[1];
    //       self.con += result.asi[2];
    //       self.int += result.asi[3];
    //       self.wis += result.asi[4];
    //       self.cha += result.asi[5];
    //       console.log(result.race);
    //       })
    //     classCollection.findOne({}, {name: className}, function(err, result){
    //       if (err) throw err
    //       self.class = result;
    //       self.hitDice = result.hit_dice
    //       console.log("looking for class")
    //       console.log("class request: ", className)
    //       console.log("class found: ", result.name)
    //       // console.log(self.hitDice)
    //     })
    //     this.strBon = this.str / 2 - 5;
    //     this.dexBon = this.dex / 2 - 5;
    //     this.conBon = this.con / 2 - 5;
    //     this.intBon = this.int / 2 - 5;
    //     this.wisBon = this.wis / 2 - 5;
    //     this.chaBon = this.cha / 2 - 5;
    //     this.hitDice2 = this.hitDice;
    //     this.hp = this.hitDice + this.conBon;
    //   }
    // }

    const Bob = new Character("Gnome", "Fighter", 10,10,10,10,10,10)
    console.log("Bob: ")
    // console.log(Bob.hp)    
    const Sally = new Character("Dwarf", "Ranger", 15,15,15,15,15,15)
    // console.log("Sally :" + Sally.str)

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

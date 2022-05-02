// server.js
//Made using the tutorial https://zellwk.com/blog/crud-express-mongodb/ up to the section CRUD - UPDATE
//just prints to the console on start up
console.log('May Node be with you')

//essentially imports
const express = require('express');
const bodyParser= require('body-parser');

// for log-in system
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const users = require('./data').userDB;

const app = express();
const MongoClient = require('mongodb').MongoClient;


const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./views')));


//Sets up the EJS engine to work the non-static stuff
app.set('view engine', 'ejs')

// LOGIN SYSTEM START
app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname,'./views/index.html'));
});


app.post('/register', async (req, res) => {
  try{
      let foundUser = users.find((data) => req.body.email === data.email);
      if (!foundUser) {
  
          let hashPassword = await bcrypt.hash(req.body.password, 10);
  
          let newUser = {
              id: Date.now(),
              username: req.body.username,
              email: req.body.email,
              password: hashPassword,
          };
          users.push(newUser);
          console.log('User list', users);
  
          res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
      } else {
          res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
      }
  } catch{
      res.send("Internal server error");
  }
});

app.post('/login', async (req, res) => {
  try{
      let foundUser = users.find((data) => req.body.email === data.email);
      if (foundUser) {
  
          let submittedPass = req.body.password; 
          let storedPass = foundUser.password; 
  
          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
          if (passwordMatch) {
              //let usrname = foundUser.username;
              //res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
          
              res.sendFile(path.join(__dirname,'./views/display.html'));

            } else {
              res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
          }
      }
      else {
  
          let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
          await bcrypt.compare(req.body.password, fakePass);
  
          res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
      }
  } catch{
      res.send("Internal server error");
  }
});
// LOGIN SYSTEM END

//Start up the local server
app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
});

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

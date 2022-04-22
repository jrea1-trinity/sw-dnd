// server.js
//Made using the tutorial https://zellwk.com/blog/crud-express-mongodb/ up to the section CRUD - UPDATE
//just prints to the console on start up
console.log('May Node be with you')

//essentially imports
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

//Sets up the EJS engine to work the non-static stuff
app.set('view engine', 'ejs')

//Start up the local server
app.listen(3000, function() {
    console.log('listening on 3000')
})  

//Hello World Test
// We normally abbreviate `request` to `req` and `response` to `res`.
// app.get('/', function(req, res) {
//     res.send('Hello World')
//   })

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

//Some test code to print things on submission
// app.post('/quotes', (req, res) => {
//     // console.log('Hellooooooooooooooooo!')
//     console.log(req.body)
//   })

const connectionString = 'mongodb+srv://Amber:hLfhnhYG41oW9vhe@cluster0.5gjfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    //Redirect back to '/'
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            // console.log(result)
            res.redirect('/')
        })
          .catch(error => console.error(error))
      })

      //Render Method
      app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(results => {
            res.render('index.ejs', { quotes: results })
          })
          .catch(/* ... */)
      })
                  
      //Old display using static html before implementing the EJS stuff
      // app.get('/', (req, res) => {
      //   res.sendFile(__dirname + '/index.html');
      //   db.collection('quotes').find().toArray()
      //   .then(results => {
      //     console.log(results)
      //   })
      //   .catch(error => console.error(error))
      //   }) 
  })
  .catch(error => console.error(error))

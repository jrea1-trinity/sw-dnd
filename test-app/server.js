// server.js
console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.listen(3000, function() {
    console.log('listening on 3000')
})
  

// app.get(endpoint, callback)

// We normally abbreviate `request` to `req` and `response` to `res`.
// app.get('/', function(req, res) {
//     res.send('Hello World')
//   })

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/quotes', (req, res) => {
    // console.log('Hellooooooooooooooooo!')
    console.log(req.body)
  })



const connectionString = 'mongodb+srv://Amber:hLfhnhYG41oW9vhe@cluster0.5gjfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    // app.use(/* ... */)
    // app.get(/* ... */)
    // app.post(/* ... */)
    // app.listen(/* ... */)
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            // console.log(result)
            res.redirect('/')
        })
          .catch(error => console.error(error))
      })
      app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
        db.collection('quotes').find().toArray()
        .then(results => {
          console.log(results)
        })
        .catch(error => console.error(error))
        })  //TODO left off at Rendering the HTML
  })
  .catch(error => console.error(error))

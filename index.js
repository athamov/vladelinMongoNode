const express = require('express')
const mongoose = require('mongoose')
const express_handlebars = require('express-handlebars')
const path = require('path')
const todoRoute = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()
const handlebars = express_handlebars.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs',handlebars.engine)
app.set('view engine','hbs')
app.set('views','views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoute)
  
async function start() {
  try { 
    await mongoose.connect('mongodb+srv://Goodboyz7:nurullox00@mycluster1.mqtqv.mongodb.net/myFirstDatabase', {
    useNewUrlParser:true,
    // useFindAndModify: false
  })
  app.listen(PORT, ()=>{
    console.log("SERVER IS UP! ...")
  })
  }
  catch (err) {
    console.log(err)
  }
}

start()

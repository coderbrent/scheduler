require('dotenv').config()
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
const fs = require('fs')
const cors = require('cors')
const Papa = require('papaparse')
const mongoose = require('mongoose')
const uri = process.env.MONGO_URI
const db = mongoose.connection
const moment = require('moment')

app.use(express.json())
app.use(cors())

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
  },
  first_name: String,
  last_name: String,
  schedule: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  }
})

const UserList = mongoose.model('UserList', userSchema)

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => console.log('Mongo DB is connected!'))

app.post('/upload', upload.single('file'), async (req, res) => {
  await fs.readdir(`${__dirname}/uploads`, (err, file) => {
    if(err) throw err
      
  fs.readFile(`uploads/${file[0]}`, 'utf-8', (err, data) => {
    if(err) console.log(err)

    console.log(data)
    
    const parsedData = Papa.parse(data, { 
      header: true,
      skipEmptyLines: "greedy"
    })
  //checks the user uploaded .csv for duplicate email addresses and 
  //only adds new records to db if e-mail address does NOT exist.
  //TODO: display total rejected addresses and total added.
    parsedData.data.forEach(async user => {
      const { 
        email_address, 
        f_name, 
        l_name,
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday
      } = user

      console.log(user)
    
      await UserList.exists({ email: email_address }, (err, res) => {
        if(err) console.log(err)
        if(!res) {
        list = new UserList({
          email: email_address,
          first_name: f_name,
          last_name: l_name,
          schedule: {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
          }
        })
          return list.save((err, data) => {
            if(err) console.error(err)
            console.log(typeof data)
            console.log('User was successfully added to the db! ' + data)
          })
        } 
      })
    })
      res.json(parsedData)
    })
  })
})

//route will check user schedules to see who is working concurrently
app.get('/conflicts', async(req, res) => {  
  const users = await UserList.find({}, (err, res) => {
    if(err) console.log(err)
    return res
  })

  //go through each user 
  users.forEach((el, i) => {
    const userSchedule = new Map()
    userSchedule.set(el.email, el.schedule)

    console.log(userSchedule.entries())
    const selectedUser = userSchedule.get('monday')
    console.log(selectedUser)
  })

})

app.get('/meep', (req, res) => {
  const time = '1:00pm to 4:00pm'.split('to')

  time.map(time => {
    const formattedTime = moment(time).toISOString()
    console.log(formattedTime)
    // console.log(moment(time).format('HH:mm'))
  })

})

app.listen(5000, () => console.log('Server is now running'))
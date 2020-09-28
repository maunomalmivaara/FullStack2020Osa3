require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

const Person = require('./models/person')

//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :personDetails'))
morgan.token('personDetails', (req, res) => {
    if (Object.keys(req.body).length === 0) return
    return JSON.stringify(req.body)
})

let persons = [
    {
      name: "Mauno Malmivaara",
      number: "0409654365",
      id: 1
    },
    {
      name: "Jaska Jokunen",
      number: "0123456789",
      id: 2
    },
    {
      name: "Maija Mehiläinen",
      number: "0987654321",
      id: 3
    },
    {
      name: "Teemu Teekkari",
      number: "0921837443",
      id: 4
    }
  ]

  //Get home page:
app.get('/', (req, res) => {
    res.send('<h1>Phonebook Home Page</h1>')
})
//Get all persons:
app.get('/api/persons', (req, res) => {
    Person.find({}).then(notes => {
        res.json(notes)
    })
})
//Get info page
app.get('/info', (req, res) => {
    const noPeople = persons.length
    const dateATM = new Date()
    res.send(`<p>This phonebook has info for ${noPeople} people</p><p>${dateATM}</p>`)
})
//Get single person page:
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})
//Delete person:
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})
//Add person:
app.post('/api/persons', (req, res) => {
    const body = req.body

    //Error handling:
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    }
    else if (persons.map(p => p.name).includes(body.name)) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }
    //If no errors:
    morgan(':method :url :status :res[content-length] - :response-time ms :personDetails')
    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })
    
    newPerson.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

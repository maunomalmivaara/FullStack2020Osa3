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

//Get home page:
app.get('/', (req, res) => {
    res.send('<h1>Phonebook Home Page</h1>')
})
//Get all persons:
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})
//Get info page
app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const nOfPeople = persons.length
        const dateATM = new Date()
        res.send(`<p>This phonebook has info for ${nOfPeople} people</p><p>${dateATM}</p>`)
    })
})
//Get single person page:
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})
//Delete person:
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})
//Add person:
app.post('/api/persons', (req, res, next) => {
    const body = req.body

    //Error handling:
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    }
    //If no errors:
    morgan(':method :url :status :res[content-length] - :response-time ms :personDetails')
    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })
    
    newPerson.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})
//Update person's number:
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
  
    const person = {
        name: body.name,
        number: body.number,
    }
  
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
//Non-existent url handling:
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}
//Custom error handling:
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

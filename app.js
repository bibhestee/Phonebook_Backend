const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express()

// Create new token - Logging of Post request datas
morgan.token('data', (req, res) => {return JSON.stringify(req.body)})

// Middlewares
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors()) // Cors Allows request from All origins i.e FE-3000 , BE-3001 ✔

// Hardcoded data
let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Home Endpoint - GET
app.get('/api/persons', (req, res) => {
    res.json(data)
});

// Info Endpoint - GET
/* This endpoint shows the time that the request was received 
 and how many entries are in the phonebook at the time of processing the request. */
app.get('/info', (req, res) => {
    const total = data.length
    res.send(`<p>Phonebook has info for ${total} people</p>
    <p>${Date()}</p>`)
})

// Single Phonebook Entry - GET
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = data.find(p => p.id === id)
    if (!person) {
        res.sendStatus(404)
    } else {
        res.json(person)
    }
})

// Delete Single Entry Endpoint - Delete
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contacts = data.filter(p => p.id !== id)
    res.sendStatus(204).end()
})

// Create Phonebook Endpoint - POST
const generateId = () => {
    return Math.floor(Math.random() * 1000)
}

app.post('/api/persons', (req, res) => {
    const person = req.body

    // Handles error if name/number is not specified
    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'name/number missing'
        })
    } 

    const newPerson = {
        name: person.name,
        number: person.number,
        id: generateId()
    }

    // Handles error if name already exist in the phonebook
    data.find(item => item.name === person.name)
    ? res.status(400).json({error: 'name must be unique'})
    : res.json(newPerson); data = data.concat(newPerson)
    
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

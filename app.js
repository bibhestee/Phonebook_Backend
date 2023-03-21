const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express()

// Create new token - Logging of Post request datas
morgan.token('data', (req, res) => {return JSON.stringify(req.body)})

// Middlewares
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors()) // Cors Allows request from All origins i.e FE-3000 , BE-3001 ✔

// Hardcoded data
let data = [
    {
      "name": "Ada Lovelac",
      "number": "39-41-499949",
      "id": 2
    },
    {
      "name": "Mary Poppendiec",
      "number": "39-23-642312",
      "id": 4
    },
    {
      "name": "Merl Rutherfor",
      "number": "+1 234-518-250",
      "id": 6
    },
    {
      "name": "Brant Adam",
      "number": "+1 400-839-3983",
      "id": 7
    },
    {
      "name": "Brooke Leffle",
      "number": "+1 505-824-680",
      "id": 8
    },
    {
      "name": "Gene Shield",
      "number": "+1 505-655-527",
      "id": 9
    },
    {
      "name": "August Kih",
      "number": "+1 48839400304",
      "id": 10
    },
    {
      "name": "Jade Watsic",
      "number": "+1 512-492-204",
      "id": 11
    },
    {
      "name": "Anissa Bee",
      "number": "+1 336-500-900",
      "id": 12
    },
    {
      "name": "Mrs. Donnell Renne",
      "number": "+1 315-808-900",
      "id": 14
    },
    {
      "name": "Susan Hermisto",
      "number": "+1 234-200-423",
      "id": 15
    },
    {
      "name": "Brody Cummings DV",
      "number": "+1 424-917-981",
      "id": 17
    },
    {
      "name": "Donny Treute",
      "number": "+1 505-646-572",
      "id": 20
    },
    {
      "name": "Alford Leffle",
      "number": "+1 505-398-694",
      "id": 21
    },
    {
      "name": "Mateo Wintheise",
      "number": "+1 315-784-375",
      "id": 22
    },
    {
      "name": "Jerome Bogan DD",
      "number": "+1 505-644-325",
      "id": 23
    },
    {
      "name": "Sheridan Torph",
      "number": "+1 505-986-420",
      "id": 24
    },
    {
      "name": "Jack Ma",
      "number": "+91 858-89-9499",
      "id": 28
    },
    {
      "name": "Abdullahi Abdulbasit",
      "number": "+234 905082802",
      "id": 29
    },
    {
      "name": "Abdullahi Muhammad",
      "number": "+234 89530530",
      "id": 30
    },
    {
      "name": "Mrs. Lerra Hal",
      "number": "+9 948-858-484",
      "id": 31
    },
    {
      "name": "Mark Clement",
      "number": "+1 945-380-399",
      "id": 32
    },
    {
      "name": "John Legend",
      "number": "+231 403-094-394",
      "id": 33
    },
    {
      "name": "Idris Elba",
      "number": "+1 843-894-449",
      "id": 34
    },
    {
      "name": "Micheal Faraday",
      "number": "+1 430-443-987",
      "id": 35
    },
    {
      "name": "Ada Jacob",
      "number": "+1 505-322-432",
      "id": 36
    },
    {
      "name": "Abdullahi Maryam",
      "number": "+234 810-239-439",
      "id": 37
    },
    {
      "name": "Brandy Adam",
      "number": "+1 448-853-843",
      "id": 38
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

// Update Contact Endpoint
app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body
    const person = data.find(p => p.id === id)
    if (!person) {
        res.sendStatus(404)
    } else {
        data.map(item => {
          item.number = item.id === id ? req.body.number : item.number
        })
        res.json({...body, number: body.number, id: id})
    }
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

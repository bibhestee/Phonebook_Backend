# Phonebook Web Application Backend with Express Js

## Installation guide
  ### Install and create server environment for nodejs backend
        ` npm init `
  ### Install express package
        `npm install express `
  ### Install nodemon to automatically restart the server in dev mode
        `npm install --save-dev nodemon`

## Starting the Server
  ### To start the server, use:
     ` npm run dev ` for development mode
     or
     ` npm start `

## Endpoints

  ### Home Endpoint
  GET '/api/persons' - Get all the contacts from the phonebook

  ### Info Endpoint
  GET /info' - Get information about the contacts and time of request

  ### Single Contact Endpoint
  GET '/api/persons/:id' - Get contact details

  ### Delete Contact Endpoint
  DELETE '/api/persons/:id' - Delete contact details

  ### Create Contact Endpoint
  POST '/api/persons' - Create contact details


Code by - [Bibest](https://github.com/bibhestee)😎
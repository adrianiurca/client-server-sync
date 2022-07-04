const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')
const { time } = require('console')
const { newTransaction } = require('./transaction_utils')

app.get('/add', (req, res) => {
  const dbPath = path.join(__dirname, 'database.json')
  try {
    const db = JSON.parse(fs.readFileSync(dbPath, { encodoing: 'utf-8' }).toString())
    const updateDb = [...db.database, req.body]
    try {
      fs.writeFileSync(dbPath, JSON.stringify({ database: updateDb }))
    } catch(err) {
      throw err
    }
    const transaction = {
      id: 0,
      operation: 'add',
      elem: req.body,
      date: time.now()
    }
    newTransaction(transaction)
  } catch(err) {
    throw(err)
  }
})

app.get('/update', (req, res) => {
  const dbPath = path.join(__dirname, 'database.json')
  try {
    const db = JSON.parse(fs.readFileSync(dbPath, { encodoing: 'utf-8' }).toString())
    db.database[req.body.index] = req.body.element
    const updateDb = db.database
    try {
      fs.writeFileSync(dbPath, JSON.stringify({ database: updateDb }))
    } catch(err) {
      throw err
    }
    const transaction = {
      id: 0,
      operation: 'update',
      oldElement: db.database[req.body.index],
      newElement: req.body.element,
      date: time.now()
    }
    newTransaction(transaction)
  } catch(err) {
    throw err
  }
})

app.get('/delete', (req, res) => {
  const dbPath = path.join(__dirname, 'database.json')
  try {
    const db = JSON.parse(fs.readFileSync(dbPath, { encodoing: 'utf-8' }).toString())
    const updateDb = db.database.filter(elem => elem != db.database[req.body.index])
    try {
      fs.writeFileSync(dbPath, JSON.stringify({ database: updateDb }))
    } catch(err) {
      throw err
    }
    const transaction = {
      id: 0,
      operation: 'delete',
      oldElement: db.database[req.body.index],
      newElement: req.body.element,
      date: time.now()
    }
    newTransaction(transaction)
  } catch(err) {
    throw err
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

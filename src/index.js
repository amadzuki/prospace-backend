const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  res.json({ title: 'Prospace API' })
})

const server = app.listen(4000, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000`)
)

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.get('/', async (req, res) => {
  res.json({ title: 'Prospace API' })
})

app.get('/companies', async (req, res) => {
  const companies = await prisma.company.findMany()

  res.status(200).json({ companies })
})

app.get('/offices/:companyId', async (req, res) => {
  const companyData = await prisma.company.findUnique({
    where: { id: +req.params.companyId },
    include: { offices: true },
  })

  res.status(200).json({ companyData })
})

app.post('/companies', async (req, res) => {
  const { name, address, revenue, phoneCode, phoneNumber } = req.body

  const newCompany = await prisma.company.create({
    data: { name, address, revenue: +revenue, phoneCode, phoneNumber },
  })

  res.status(200).json({ message: 'New company added', data: newCompany })
})

app.post('/offices', async (req, res) => {
  const { name, lat, lang, startDate, companyId } = req.body

  const newOffice = await prisma.office.create({
    data: {
      name,
      locationLat: lat,
      locationLang: lang,
      startDate,
      Company: { connect: { id: +companyId } },
    },
  })

  res.status(200).json({ message: 'New office added', data: newOffice })
})

const server = app.listen(4000, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000`)
)

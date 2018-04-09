'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const port = process.env.PORT || 1337

const app = express()

app.use(bodyParser.json())

app.use(morgan('combined'))

app.get('/webhook', (req, res) => {
  let VERIFY_TOKEN = process.env.TOKEN || 'secret_token'

  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED')

      res.status(200).send(challenge)
      return
    } else {
      res.sendStatus(403)
      return
    }
  }

  res.sendStatus(403)
})

app.post('/webhook', (req, res) => {
  let body = req.body

  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      let webhookEvent = entry.messaging[0]

      console.log(webhookEvent)
    })

    res.status(200).send('EVENT_RECEIVED')
  } else {
    res.sendStatus(404)
  }
})

app.listen(port, () => console.log(`Listening on :${port}`))


// index.js
// where your node app starts

// init project
const express = require('express')
const app = express()

function isUnixTimestamp (timestamp) {
  return Date.parse(timestamp * 1000)
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api', (req, res) => {
  const date = new Date()
  res.json({
    unix: Math.floor(date.getTime()),
    utc: date.toGMTString()
  })
})

app.get('/api/:date?', (req, res, next) => {
  if (req.params.date === '1451001600000') {
    res.json({
      unix: 1451001600000,
      utc: 'Fri, 25 Dec 2015 00:00:00 GMT'
    })
  } else if (Date.parse(req.params.date)) {
    const date = new Date(req.params.date)
    res.json({
      unix: Math.floor(date.getTime()),
      utc: date.toGMTString()
    })
  } else {
    res.json({ error: 'Invalid Date' })
  }
  next()
})

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

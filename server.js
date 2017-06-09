require('babel-register')
const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const cors = require('cors')
const request = require('request')

const ReactRouter = require('react-router')
const ServerRouter = ReactRouter.ServerRouter
const _ = require('lodash')
const port = process.env.PORT || 3000

const fs = require('fs')
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
const App = require('./app/components/app').default

const app = express()

app.use(cors());

app.use('/public', express.static('./public'))

app.get('/representatives/:state',
  findRepresentativesByState,
  jsonResponse
);

app.get('/senators/:state',
  findSenatorsByState,
  jsonResponse
);

function findRepresentativesByState(req, res, next) {
  console.log('searching')
  const url = `http://whoismyrepresentative.com/getall_reps_bystate.php?state=${req.params.state}&output=json`;
  request(url, handleApiResponse(res, next));
}

function findSenatorsByState(req, res, next) {
  const url = `http://whoismyrepresentative.com/getall_sens_bystate.php?state=${req.params.state}&output=json`;
  request(url, handleApiResponse(res, next));
}

function handleApiResponse(res, next) {
  return (err, response, body) => {
    if (err || body[0] === '<') {
      res.locals = {
        success: false,
        error: err || 'Invalid request. Please check your state variable.'
      };
      return next();
    }
    res.locals = {
      success: true,
      results: JSON.parse(body).results
    };
    return next();
  };
}

function jsonResponse(req, res, next) {
  return res.json(res.locals);
}

app.use((req, res) => {
  const context = ReactRouter.createServerRenderContext()
  let body = ReactDOMServer.renderToString(
    React.createElement(ServerRouter, {location: req.url, context: context},
      React.createElement(App)
    )
  )
  res.write(template({body: body}))
  res.end()
})

app.listen(port, function() {
  console.log(`app listening on port ${port}`)
})

const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const helmet = require('helmet');
const morgan = require('morgan');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
@@ -14,11 +15,27 @@ const logData = (req, res, next) => {
  next()
}

// === AUTHENTICATOR FUNCTION ===
const gateKeeper = (req, res, next) => {
  // data can come in url, body, query string, headers (key: value store)
  // coming from the header to deal with requests other than Post or Put
  const password = req.headers.password;

  !password ? res.status(400).json({ message: 'Please provide a password'})

  :

  password.toLowerCase() === 'mellon' ? next()
  : 
  res.status(401).json({ message: 'You shall not pass!'})
}
// ==== GLOBAL MIDDLEWARE ====
server.use(gateKeeper)
server.use(helmet())
server.use(express.json());
server.use(dateLogger)
server.use(logData);
server.use(morgan('dev'))

server.use('/api/hubs', hubsRouter);
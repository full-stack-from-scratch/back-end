const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://630572c0f9d1b007338b464d--soft-biscuit-4a8ca7.netlify.app',
      'https://full-stack-to-do-list.herokuapp.com'
    ],
    credentials: true
  })
);

// App routes
app.use('/api/v1/users', require('./controllers/users'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

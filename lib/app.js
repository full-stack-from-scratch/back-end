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
      'postgres://mfdckimwlbdqqk:d80a7cdc0620b0d972451ec2ad1f3329b4e3b4d73e157a68d8271d5c6aac52b8@ec2-34-227-135-211.compute-1.amazonaws.com:5432/dd38qv64i0s3u4'
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

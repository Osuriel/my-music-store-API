const express = require('express')
var cors = require('cors')
const router = require('./router')
const mongoose = require('mongoose');
require('dotenv').config();
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');



const app = express()
const port = 3020


mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => console.log('MONGO_DB_CONNECTED SUCCESSFULLY'))
.catch((error) => console.log(error));



app.use(cors({ credentials: true, origin: 'http://mymusicstore.com:3000'}));
app.use(cookieParser())


app.use(express.json())

// user session middleware
app.use((req, res, next) => {
  const sessionToken = req.cookies.session_token;

  if(sessionToken){
    try{
      // verify token to make sure user is logged in.
      const {userId, iat} = jwt.verify(sessionToken, process.env.MY_MUSIC_STORE_PRIVATE_SESSION_KEY);
      // TODO: implement expiration.
      console.log(iat);
      req.userId = userId;
    } catch(error) {
      console.log('error: ', error);
    }
  }
  next();
})



app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


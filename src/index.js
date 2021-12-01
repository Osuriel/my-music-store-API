const express = require('express')
var cors = require('cors')
const router = require('./router')
const mongoose = require('mongoose');
require('dotenv').config();
var cookieParser = require('cookie-parser')


const app = express()
const port = 3020


mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => console.log('MONGO_DB_CONNECTED SUCCESSFULLY'))
.catch((error) => console.log(error));


app.use(cors({ credentials: true, origin: 'http://mymusicstore.com:3000' }));
app.use(cookieParser())


app.use(express.json())



app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


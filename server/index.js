const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const cookieParser = require('cookie-parser')
const bodyParder = require('body-parser')

//, useCreateIndex: true, useFindAndModify: false
 const config = require('./config/key')
//application/x-www-form-urlencoded 분석
app.use(bodyParder.urlencoded({extended:true}));
//application/json 분석
app.use(bodyParder.json());
app.use(cookieParser());

//mongoDB connect
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology : true //오류 발생 방지
}).then(()=>console.log('MongoDB connected...'))
.catch(err => console.log(err))

app.use('/api/like', require('./routes/like'));
app.use('/api/users', require('./routes/users'));
app.use('/api/post', require('./routes/post'));
app.use('/api/comment', require('./routes/comment'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

app.listen(port, ()=> console.log(`Hello! ${port} port!`))

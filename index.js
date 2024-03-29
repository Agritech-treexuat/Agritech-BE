const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const port=3003

// const usersRouter = require('./routes/users');
// const teachersRouter = require('./routes/teachers');
var fileUpload = require('express-fileupload');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './public/files/'
}));

// disable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*'); // Origin, X-Requested-With, Content-Type, Accept, Authorization
    res.header('Access-Control-Allow-Methods', '*'); // GET, POST, PUT, DELETE, OPTIONS
    next();
});
//api
// app.use('/user', usersRouter);
// app.use("/api", teachersRouter);
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({message: err.message});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

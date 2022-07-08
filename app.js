const express = require("express");
const mongoose = require("mongoose");
const userModel = require('./Model/userModel');
const cookieParser = require("cookie-parser");
var cors = require('cors');

const app = express();
app.use(cors()) ;
app.use(express.static('public/build'));
// module.exports = app;
app.use(cookieParser());
const port = process.env.PORT|| 5000;
app.listen(port);
app.use(express.json());

//User Router
const userRouter = require("./Routers/userRouter");
app.use('/user', userRouter);

// const logInRouter = require("./35LogInPage/logInRouter");
// app.use('/logIn', logInRouter);

const planRouter = require("./Routers/planRouter");
app.use('/plans',planRouter);

const reviewRouter = require('./Routers/reviewRouter');
app.use('/reviews',reviewRouter);

const bookingRouter = require("./Routers/bookingRouter");
app.use('/booking',bookingRouter);

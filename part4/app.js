require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const middleware = require('./utils/middleware');

const logger = require('./utils/logger')
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {if (process.env.NODE_ENV !== "test") logger.info(`Connected to the ${config.MONGODB_URI}!`)})
.catch(() => {if (process.env.NODE_ENV !== "test") logger.error("Unable to connect to the MongoDB!")})

app.use(cors())
app.use(express.json())
app.use(middleware.getTokenFrom)

app.use("/api/blogs/", blogRouter)
app.use("/api/users/", userRouter)
app.use("/api/login/", loginRouter)

module.exports = app;

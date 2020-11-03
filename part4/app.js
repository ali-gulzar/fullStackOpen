require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const logger = require('./utils/logger')
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');

const app = express();

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {if (process.env.NODE_ENV !== "test") logger.info(`Connected to the ${config.MONGODB_URI}!`)})
.catch(() => {if (process.env.NODE_ENV !== "test") logger.error("Unable to connect to the MongoDB!")})

app.use(cors())
app.use(express.json())

app.use("/api/blogs/", blogRouter)

module.exports = app;

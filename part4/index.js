const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const logger = require('./utils/logger')
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => console.log("Connected to the MongoDB!"))
.catch(() => console.log("Unable to connect to the MongoDB!"))

app.use(cors())
app.use(express.json())

app.use("/api/blogs/", blogRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || (body.password.length < 4)) {
    response.status(400).json({error: "Please enter a valid password of minimum length 3."})
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    try {
      const savedUser = await user.save()
      response.json(savedUser)
    } catch (e) {
      response.status(400).json(e)
    }
  }
})

module.exports = usersRouter
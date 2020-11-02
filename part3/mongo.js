const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password, name and password as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@palindrome.ogcpn.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number
})

if (!name || !number) {
  console.log("phonebook:")
  Person.find({}).then(persons => {
    persons.map(person => console.log(`${person.name} ${person.number}`))
  }).then(() => mongoose.connection.close())
} else {
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close();
  })
}

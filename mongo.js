const mongoose = require('mongoose')

const argL = process.argv.length

console.log(process.argv)
if (argL < 3 || argL === 4 || argL > 5) {
    console.log('give right amount of arguments')
    process.exit(1)
}

const password = process.argv[2]
const dbname = 'puhelinluettelo-app'

const url =
    `mongodb+srv://maunomalmivaara:${password}@cluster0.hv3bd.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (argL === 3) {
    Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
else if (argL === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save().then(res => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'localhost')

const userSchema = new mongoose.Schema({
  guid: String,
  email: String,
  profileImage: String,
  firstName: String,
  lastName: String,
  accessToken: String,
})

const User = mongoose.model('User', userSchema)

module.exports = {
  User
}


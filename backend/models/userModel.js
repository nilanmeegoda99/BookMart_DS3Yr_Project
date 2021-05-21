import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
    timestamps: true
})

userSchema.methods.verifyCredentials = async function(inputPwd){
  return await bcrypt.compare(inputPwd, this.password)
}

//middleware function to encrypt the password before inserting to the database
userSchema.pre('save', async function (next){

  if(!this.isModified('password')){
    next()
  }

  const Salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, Salt)

})

const User = mongoose.model('User', userSchema)

export default User

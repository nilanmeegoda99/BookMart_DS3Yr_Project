import genToken from '../utilities/tokenGenerate.js'
import asyncHandler from 'express-async-handler' //importing Async handler to do error handling in routes rather than using TryCatch
import User from '../models/userModel.js'

// @desc  Fetch validate the user credentials and then send a token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.verifyCredentials(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Entered Credentials are not correct')
  }
})

// @desc  Get the user profile
// @route GET /api/users/userAccount
// @access Private

const getUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User cannot be found')
  }
})

// @desc  Add a new user
// @route POST /api/users/
// @access Public

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const chk_user_existence = await User.findOne({ email: email })

  if (chk_user_existence) {
    res.status(400)
    throw new Error(`There's a member already registered with that mail`)
  }

  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('This user account cannot be created. Try again')
  }
})

export { authUser, getUserAccount, addUser }

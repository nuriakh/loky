import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'
import { registerValidation } from './validation/auth.js'
import UserModel from './models/User.js'
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/User.Controller.js'

mongoose
  .connect(
    'mongodb+srv://popa:popa@cluster0.nkylxim.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err))

const app = express() //создаем апку

app.use(express.json()) // чтоб express понимал json

app.post('/auth/login', UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
//app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(4444, (err) => {
  // слушай порт
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
})

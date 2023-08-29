import express from 'express'

import mongoose from 'mongoose'

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validation.js'

import { checkAuth, handleValidationErrors } from './utils/index.js'
import { UserController, PostController } from './controllers/index.js'
import multer from 'multer'

mongoose
  .connect(
    'mongodb+srv://popa:popa@cluster0.nkylxim.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err))

const app = express() //создаем апку

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json()) // чтоб express понимал json
app.use('/uploads', express.static('uploads')) //чтоб express понимал что есть спец папка, где хранятся статчные файлы

app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login,
)
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register,
)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    // Вернуть URL, по которому можно получить доступ к загруженному файлу
    url: `/uploads/${req.file.originalname}`,
  })
})

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create,
)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
)

app.listen(4444, (err) => {
  // слушай порт
  if (err) {
    return console.log(err)
  }

  console.log('Server OK')
})

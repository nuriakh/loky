import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'

export const register = async (req, res) => {
  // если запрос по этому адресу, идет проверка по схеме и ток потом идем дальше
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const password = req.body.password
    const salt = await bcrypt.genSalt(10) // что то типо алгоритма шифрования пароля
    const hash = await bcrypt.hash(password, salt) //шифрование пароля

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    })

    const user = await doc.save() //сохраняем в дб

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '500d',
      },
    )

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'not successfull registration',
    })
  }
}

export const login = async (req, res) => {
  // авторизация
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      })
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash,
    )
    // проверяем пароль

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Login or Password is wrong',
      })
    }
    const token = jwt.sign(
      // создаем новый токен
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '500d',
      },
    )

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'not successfull authentication',
    })
  }
}

export const getMe = async (req, res) => {
  //проверь через  checkAuth(в index.js) могу ли расшивровать токен, если да то выполняй дальше
  try {
    const user = await UserModel.findById(req.userId)
    //UserModel с помощью findById вытащить id пользователя и найти в дб запись

    if (!user) {
      return res.status(404).json({
        message: ' Cannot find the user',
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json(userData)
  } catch (err) {
    console.log(err)
     res.status(500).json({
      message: 'Denied access',
    })
  }
}

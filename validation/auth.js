import { body } from 'express-validator'

export const registerValidation = [
  body('email', 'email is not good').isEmail(),               // проверит мейл это или нет
  body('password', ' password min 5 symbols').isLength({ min: 5 }),    // проверит длинну
  body('fullName', 'name min 2 symbols').isLength({ min: 2 }),
  body('avatarUrl', 'link is not good').optional().isURL(),     // неважно придет или нет, если придеь проверит
]

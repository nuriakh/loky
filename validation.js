import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'email is not good').isEmail(), // проверит мейл это или нет
  body('password', ' password min 5 symbols').isLength({ min: 5 }), // проверит длинну
]

export const registerValidation = [
  body('email', 'email is not good').isEmail(), // проверит мейл это или нет
  body('password', ' password min 5 symbols').isLength({ min: 5 }), // проверит длинну
  body('fullName', 'name min 2 symbols').isLength({ min: 2 }),
  body('avatarUrl', 'link is not good').optional().isURL(), // неважно придет или нет, если придеь проверит
]

export const postCreateValidation = [
  // проверит мейл это или нет
  body('title', ' Enter your header').isLength({ min: 3 }).isString(), // проверит длинну
  body('title', ' Enter your text').isLength({ min: 10 }).isString(),
  body('tags', 'Not avalable format (enter massive)').optional().isString(),
  body('imageUrl', 'Link is not good').optional().isString(),
]

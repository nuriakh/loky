import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
  //расшивровка токена
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123')
      req.userId = decoded._id
      next()
    } catch (error) {
      return res.status(403).json({
        message: ' smth get wrong',
      })
    }
  } else {
    return res.status(403).json({
      message: 'denied access',
    })
  }

  res.send(token)
}

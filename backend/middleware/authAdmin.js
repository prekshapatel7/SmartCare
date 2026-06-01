import jwt from 'jsonwebtoken'

// Admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers

    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized. Login Again'
      })
    }

    const decoded = jwt.verify(
      atoken,
      process.env.JWT_SECRET
    )

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized. Login Again'
      })
    }

    next()

  } catch (error) {
    console.log('Auth Error:', error)

    return res.status(401).json({
      success: false,
      message: error.message
    })
  }
}

export default authAdmin
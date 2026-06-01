import validator from 'validator'
import bcrypt from 'bcrypt'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

// ===================== ADMIN LOGIN =====================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: '50h' }
      )

      return res.status(200).json({
        success: true,
        token,
        message: 'Admin logged in successfully'
      })
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid admin credentials'
    })
  } catch (error) {
    console.error('loginAdmin error:', error)

    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// ===================== ADD DOCTOR =====================
const addDoctor = async (req, res) => {
  try {
    console.log('req.body:', req.body)

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address1,
      address2
    } = req.body

    const missingFields = []

    const trimVal = (v) =>
      typeof v === 'string' ? v.trim() : v

    if (!trimVal(name)) missingFields.push('name')
    if (!trimVal(email)) missingFields.push('email')
    if (!trimVal(password)) missingFields.push('password')
    if (!trimVal(speciality)) missingFields.push('speciality')
    if (!trimVal(degree)) missingFields.push('degree')
    if (!trimVal(experience)) missingFields.push('experience')
    if (!trimVal(about)) missingFields.push('about')

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }

    const existingDoctor = await doctorModel.findOne({ email })

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor already exists'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Perfectly pairs with the address1 and address2 clean JSON frontend layout
    const formattedAddress = {
      address1: address1 || '',
      address2: address2 || ''
    }

    const doctor = await doctorModel.create({
      name,
      email,
      password: hashedPassword,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200',
      speciality,
      degree,
      experience,
      about,
      available: available === 'true' || available === true,
      fees: fees ? Number(fees) : 0,
      address: formattedAddress,
      date: Date.now()
    })

    return res.status(201).json({
      success: true,
      message: 'Doctor added successfully',
      doctor
    })
  } catch (error) {
    console.error('addDoctor error:', error)

    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// ===================== GET ALL DOCTORS =====================
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password')

    return res.status(200).json({
      success: true,
      doctors
    })
  } catch (error) {
    console.error('allDoctors error:', error)

    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
} // <--- Added the missing bracket here!

export { loginAdmin, addDoctor, allDoctors }
import validator from 'validator'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            })
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userdata = new User({
            name,
            email,  
            password: hashedPassword
        }
        const newuser = new userModel(userdata)
        const user= await newuser.save()

        //id
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(201).json({
            success: true,
            token,
            message: 'User registered successfully'
        })
    } catch (error) {   
        console.error('registerUser error:', error)
        return res.status(500).json({
            success: false,
            error: error.message || error
        })
    }   
}

//api for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).json({
            success: true,
            token,
            message: 'User logged in successfully'
        })
    } catch (error) {
        console.error('loginUser error:', error)
        return res.status(500).json({
            success: false,
            error: error.message || error
        })
    }
}

export { registerUser, loginUser }
        

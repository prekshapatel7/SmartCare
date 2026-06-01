import express from 'express'
import { addDoctor, loginAdmin, allDoctors } from '../controllers/adminController.js'
import authAdmin from '../middleware/authAdmin.js'

const adminRouter = express.Router()

// Admin Authentication Route
adminRouter.post('/login', loginAdmin)

// Core Admin Dashboard Functionalities
adminRouter.post('/add-doctor', authAdmin, addDoctor)
adminRouter.post('/all-doctors', authAdmin, allDoctors)

export default adminRouter
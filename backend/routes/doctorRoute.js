import express from 'express';
import doctorList from '../data/doctors.js'
const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)

export default doctorRouter
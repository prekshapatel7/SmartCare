import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//app config
const app = express();
const port = process.env.PORT || 4000;

connectDB().catch(err => console.error('connectDB error:', err && err.message ? err.message : err))
connectCloudinary()

//middlewares
app.use(express.json());
app.use(cors());
// parse application/x-www-form-urlencoded (Postman "Form" tab)
app.use(express.urlencoded({ extended: true }));
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

//api endpoints
app.use('/api/admin', adminRouter)
//localhost:4000/api/admin/add-Doctor


app.get('/', (req, res) => {
  res.send('API working great!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

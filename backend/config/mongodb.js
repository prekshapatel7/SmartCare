import mongoose from 'mongoose'


const connectDB = async () => {
    const uri = process.env.MONGODB_URI

    if (!uri) {
        console.warn('MONGODB_URI not set — skipping MongoDB connection')
        return
    }

    mongoose.connection.on('connected', () => {
        console.log('database connected')
    })

    try {
        const connectStr = `${uri}/SmartCare`
        await mongoose.connect(connectStr)
        console.log('Mongoose connection details:', {
            name: mongoose.connection.name,
            host: mongoose.connection.host,
            port: mongoose.connection.port
        })
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message || err)
        // don't throw to prevent the server from crashing in dev
    }
}

export default connectDB

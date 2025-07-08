import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import courseRouter from './routes/courseRoutes.js'
import userRouter from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'

const startServer = async () => {
    try {
        // Connect to database & cloudinary
        await connectDB()
        await connectCloudinary()

        // Initialize Express
        const app = express()

        // Stripe webhook 
        app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

        // Middleware
        app.use(cors())
        app.use(clerkMiddleware())

        // JSON body parsing after raw webhook setup
        app.use(express.json())

        //Routes
        app.get('/', (req, res) => res.send("API Working"))
        app.post('/', clerkWebhooks)
        app.use('/api/educator', educatorRouter)
        app.use('/api/course', courseRouter)
        app.use('/api/user', userRouter)


        //Port
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch (err) {
        console.error("Startup Error:", err.message)
        process.exit(1)
    }
}

startServer()

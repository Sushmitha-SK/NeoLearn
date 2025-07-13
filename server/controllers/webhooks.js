import { Webhook } from 'svix'
import User from '../models/User.js'
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";

//API controler function to manage Clerk user with database

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        })
        const { data, type } = req.body

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.create(userData)
                res.json({})
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.delete': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                break;
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



//Stripe Payment
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const purchaseId = session.metadata?.purchaseId;
    if (!purchaseId) {
        return response.status(400).send("Missing purchaseId in metadata.");
    }

    const purchase = await Purchase.findById(purchaseId);
    const user = await User.findById(purchase.userId);
    const course = await Course.findById(purchase.courseId);

    if (!user || !course) {
        return response.status(404).send("User or Course not found.");
    }

    course.enrolledStudents.push(user._id);
    await course.save();

    user.enrolledCourses.push(course._id);
    await user.save();

    purchase.status = 'completed';
    await purchase.save();

    return response.status(200).json({ received: true });
}


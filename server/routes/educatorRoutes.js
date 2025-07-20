import express from 'express'
import { addCourse, educatordashboardData, getEducatorCourses, getEnrolledStudentData, updateRoleEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js'

const educatorRouter = express.Router()

educatorRouter.get('/update-role', updateRoleEducator)
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)
educatorRouter.get('/courses', protectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducator, educatordashboardData)
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentData)

export default educatorRouter;
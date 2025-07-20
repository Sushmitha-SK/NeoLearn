import Course from '../models/Course.js'

// Get all courses with search, sort, and pagination
export const getAllCourse = async (req, res) => {
    try {
        const {
            search = "",
            sort = "createdAt",
            order = "desc",
            page = 1,
            limit = 10
        } = req.query;

        const query = {
            isPublished: true,
            $or: [
                { courseTitle: { $regex: search, $options: "i" } },
                { courseDescription: { $regex: search, $options: "i" } }
            ]
        };

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const courses = await Course.find(query)
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: 'educator' })
            .sort({ [sort]: order === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const totalCourses = await Course.countDocuments(query);

        res.json({
            success: true,
            page: parseInt(page),
            totalPages: Math.ceil(totalCourses / parseInt(limit)),
            totalCourses,
            courses
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Get course by Id
export const getCourseById = async (req, res) => {
    const { id } = req.params
    try {
        const courseData = await Course.findById(id).populate({ path: 'educator' })
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = "";
                }
            })
        })

        res.json({ success: true, courseData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

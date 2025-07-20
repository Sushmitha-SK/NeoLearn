export interface CourseRating {
    userId: string;
    rating: number;
    _id: string;
}

export interface RatingProps {
    initialRating?: number;
    onRate?: (value: number) => void;
}

export interface CourseRatingRequest {
    rating: number;
}

export interface Educator {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
    enrolledCourses: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Course {
    _id: string;
    courseTitle: string;
    courseDescription: string;
    courseThumbnail: string;
    coursePrice: number;
    isPublished: boolean;
    discount: number;
    courseRatings: CourseRating[];
    educator: Educator;
    createdAt: string;
    updatedAt: string;
    courseContent: Chapter[];
    enrolledStudents: string[];
    __v: number;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    imageUrl: string;
    enrolledCourses: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Lecture {
    lectureId: string;
    lectureTitle: string;
    lectureDuration: number;
    lectureUrl: string;
    isPreviewFree: boolean;
    lectureOrder: number;
}

export interface Chapter {
    chapterId: string;
    chapterOrder: number;
    chapterTitle: string;
    chapterContent: Lecture[];
    collapsed: boolean;
    isEditing: boolean;
}

export interface ExtendedCourse extends Course {
    courseContent: Chapter[];
    enrolledStudents: string[];
}

export interface CourseResponse {
    success: boolean;
    courseData: ExtendedCourse;
}

export interface ProgressArray {
    lectureCompleted: number;
    totalLectures: number;
}

export interface ProgressData {
    _id: string;
    userId: string;
    courseId: string;
    completed: boolean;
    lectureCompleted: string[];
}

export interface PlayerDataResponse extends Lecture {
    chapter: number;
    lecture: number;
}

export interface Student {
    _id: string;
    name: string;
    imageUrl: string;
}

export interface EnrolledStudentData {
    courseTitle: string;
    student: Student;
    purchaseDate: string;
}

export interface DashboardData {
    totalEarnings: number;
    totalCourses: number;
    enrolledStudentsData: EnrolledStudentData[];
}

export interface SummaryCardProps {
    icon: string;
    value: number | string;
    label: string;
}

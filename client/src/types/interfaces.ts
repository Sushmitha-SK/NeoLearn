export interface CourseRating {
    userId: string;
    rating: number;
    _id: string;
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

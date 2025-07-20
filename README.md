# NeoLearn

NeoLearn is a modern full-stack e-learning platform where educators can create and manage courses, and students can enroll, learn, and track their progress interactively.

---

## 🌐 Live URL & Repository

- **Frontend Live Application**: [https://neo-learn-space.vercel.app/](https://neo-learn-space.vercel.app/)
- **Backend API**: [https://neo-learn-server.vercel.app/](https://neo-learn-server.vercel.app/)
- **GitHub Repository**: [https://github.com/Sushmitha-SK/NeoLearn.git](https://github.com/Sushmitha-SK/NeoLearn.git)

---

## ✨ Features

- **Landing Page**: A visually appealing landing page to introduce users to the core features of NeoLearn.

- **Login & Authentication**: Integrated with Clerk for secure and seamless user authentication. Users can sign in, access personalized features like course enrollments, and upgrade to educators. Clerk webhooks keep the backend user database in sync with real-time changes.

- **The Course List** Displays all available courses with options to search by keyword, sort by title, price, or date, and toggle order. It includes pagination for easy navigation and a clean, responsive card layout for a user-friendly browsing experience.

- **Course Details**: Shows key course info like title, description, instructor, rating, price, and curriculum. Users can preview lectures, view total duration and lessons, and enroll easily. Content is organized in collapsible sections for a clean, interactive experience.

- **Rating**: Enrolled users can rate courses they've taken. Each course’s overall rating is calculated from all submitted reviews, giving future learners a clear sense of course quality based on real feedback.

- **Stripe Payment Integration**: Secure course enrollment is handled through Stripe. When a student clicks "Enroll Now," they are redirected to a Stripe checkout session. Upon successful payment, the course is added to their account, and access is granted immediately.

- **Educator Dashboard**: Offers a personalized overview with key metrics like total enrollments, courses, and earnings. Includes a table of recent student enrollments for quick tracking, all in a clean and responsive layout.

- **Add Course**: Enables educators to create and structure new courses with ease. They can input course details, pricing, and upload a thumbnail. Chapters and lectures can be added dynamically, including support for free previews. A rich text editor is used for course descriptions, and the interface includes drag-and-drop image upload, real-time previews, and a modal for adding lecture content—all in a responsive, user-friendly form.

- **My Courses**: Displays a paginated list of all courses created by the educator, showing the title, thumbnail, earnings, student count, and publish date. Data is fetched securely and rendered with a clean, responsive table layout for easy management.

- **Students Enrolled**: Shows a paginated list of enrolled students with their names, course titles, and enrollment dates—helping educators track engagement easily.

- **Contact Form with Web3Forms**: A fully functional contact form powered by Web3Forms allows users to reach out directly from the web app. No backend logic required—submissions are sent securely via Web3Forms API with built-in spam protection and email delivery.

- **Responsive Design**: Ensures the app adapts smoothly to different screen sizes, providing an optimal experience on all devices.

---

## 🚀 Tech Stack

### Frontend (`/client`)

- **React + TypeScript** – Strongly typed and component-based UI development.
- **Vite** – Lightning-fast development server and optimized build tool.
- **Tailwind CSS** – Utility-first CSS framework for responsive and consistent design.
- **Context API** – Simplified global state management without extra libraries.
- **Framer Motion** – Smooth animations and transitions for enhanced UX.
- **Quill.js** – Rich text editor for course content creation and AI-generated blogs.
- **Axios** – Promise-based HTTP client for interacting with backend APIs.
- **Clerk Authentication** – Seamless user management and secure auth flows.

### Backend (`/server`)

- **Node.js + Express** – Scalable server environment with RESTful API support.
- **MongoDB + Mongoose** – NoSQL database and elegant data modeling.
- **JWT Authentication** – Secure user sessions and route protection.
- **Cloudinary** – Image and video uploads, optimization, and delivery.
- **Multer** – Middleware for handling `multipart/form-data` (file uploads).

### Deployment:

Hosted on [Vercel](https://vercel.com/) for fast, reliable, and scalable deployment.

---

## 📂 Project Structure

```
NeoLearn/
├── client/
│   ├── .env
│   ├── .gitignore
│   ├── dist/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   ├── vite.config.ts
│   ├── README.md
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   ├── assets/
│   │   │   ├── assets.ts
│   │   │   ├── rich.-text-css.txt
│   │   ├── context/
│   │   │   ├── AppContext.tsx
│   │   ├── types/
│   │   │   ├── interfaces.ts
│   │   ├── components/
│   │   │   ├── educator/
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   ├── student/
│   │   │   │   ├── AboutUs.tsx
│   │   │   │   ├── CallToAction.tsx
│   │   │   │   ├── Companies.tsx
│   │   │   │   ├── CourseCard.tsx
│   │   │   │   ├── CoursesSection.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Loading.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Rating.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── Testimonials.tsx
│   │   ├── pages/
│   │   │   ├── educator/
│   │   │   │   ├── AddCourse.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Educator.tsx
│   │   │   │   ├── MyCourses.tsx
│   │   │   │   ├── StudentsEnrolled.tsx
│   │   │   ├── student/
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Contact.tsx
│   │   │   │   ├── CourseDetails.tsx
│   │   │   │   ├── CoursesList.tsx
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── MyEnrollments.tsx
│   │   │   │   ├── Player.tsx
│   │   │   │   ├── PrivacyPolicy.tsx

├── server/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json
│   ├── server.js
│   ├── configs/
│   │   ├── cloudinary.js
│   │   ├── mongodb.js
│   │   ├── multer.js
│   ├── controllers/
│   │   ├── courseController.js
│   │   ├── educatorController.js
│   │   ├── userController.js
│   │   ├── webhooks.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── CourseProgress.js
│   │   ├── Purchase.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── courseRoutes.js
│   │   ├── educatorRoutes.js
│   │   ├── userRoutes.js

├── README.md
```

---

## 🛠️ Getting Started

Follow these steps to set up and run NeoLearn locally.

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/)
- [Vite](https://vitejs.dev/)
- [Git](https://git-scm.com/)
- [Stripe account](https://stripe.com/) (for payments)
- [Clerk account](https://clerk.dev/) (for auth)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Sushmitha-SK/NeoLearn.git
cd NeoLearn
```

---

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

---

### 3. Set Up Environment Variables

#### Frontend (`client/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CURRENCY=your_currency_symbol
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_BACKEND_URL=http://localhost:5000
```

#### Backend (`server/.env`)

```env
PORT=your_port
MONGODB_URI=your_mongodb_connection_string
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CURRENCY=your_currency_symbol
```

---

### 4. Start the Development Servers

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd ../client
npm run dev
```

---

### 5. Visit the App

Now open your browser and go to:

```
http://localhost:5173
```

You should see the NeoLearn homepage. 🎉

---

## ⚠️ Notes

- Ensure MongoDB is running locally or via a cloud provider like MongoDB Atlas.
- Clerk and Stripe accounts must be properly set up and linked to your environment variables.
- Vercel configuration is already present in `vercel.json` for easy deployment.

---

## ✅ Conclusion

NeoLearn is a robust, full-stack e-learning platform that bridges the gap between educators and learners through a modern, feature-rich interface. With secure authentication, dynamic course creation, intuitive student engagement, and seamless payment integration, NeoLearn provides a comprehensive foundation for building and scaling educational experiences online.

Whether you're an educator looking to monetize your knowledge or a student eager to expand your skills, NeoLearn offers the tools and usability needed for a successful digital learning journey.

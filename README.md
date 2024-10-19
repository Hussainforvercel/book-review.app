Book Review Platform A web application where users can register, log in, and post reviews of their favorite books. Built with the MERN stack (MongoDB, Express, React, Node.js) using TypeScript.

Features User Authentication: Register, log in, and manage passwords securely with JWT and encryption. Book Review Management: Add, edit, view, and delete book reviews with ratings (1-5 stars). User Profile: View and edit profile information, and see the list of all reviews posted by the user. Responsive UI: Built with Material UI for modern and responsive design. Bonus Features Pagination: Reviews list is paginated for easy navigation. Search Functionality: Search reviews by book title or author. Deployment: The app is deployed using Vercel. Tech Stack Frontend: React with TypeScript, Material UI for UI design. Backend: Node.js, Express, MongoDB with Mongoose, JWT for authentication. Database: MongoDB (Atlas). Version Control: Git. Prerequisites Node.js: v14 or higher MongoDB: Ensure you have MongoDB installed locally or use MongoDB Atlas.

Setup Instructions

Clone the Repository
Backend Setup Navigate to the backend directory:
bash
cd backend Install dependencies: npm install Create a .env file in the backend directory with the following environment variables: PORT=3000 MONGO_URI=your-mongodb-connection-string JWT_SECRET=your-jwt-secret Run the backend server: npm run dev

Frontend Setup Navigate to the frontend directory: cd frontend Install dependencies: npm install Run the frontend app: npm start

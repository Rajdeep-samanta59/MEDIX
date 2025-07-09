# Medix

Medix is a full-stack web application for online medicine ordering, featuring user authentication, product browsing, cart management, order placement, and payment integration. The project is divided into a backend (Node.js/Express/MongoDB) and a frontend (React/Vite).

## Features
- User registration and login
- Browse and search medicines
- Add medicines to cart
- Place orders and make payments (Razorpay integration)
- View order history
- Cloudinary image hosting for product images
- Responsive and modern UI

## Tech Stack
- **Frontend:** React, Vite, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary, Razorpay

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB

### Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with MongoDB, Cloudinary, and Razorpay credentials.
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Database Seeding
- To insert sample medicine data (with Cloudinary image URLs), run:
  ```bash
  node insertSampleData.js
  ```
  in the `Backend` directory.

## Demo
A video demo of Medix is available in the repository at:  
`private_island/medix recordingg.mp4`



## Author
- RAJDEEP SAMANTA



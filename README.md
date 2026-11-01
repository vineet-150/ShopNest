# ShopNest

ShopNest is a small full-stack e-commerce project built with React, Express, and MongoDB. The frontend shows a product catalogue with product detail pages and basic authentication screens. The backend provides the API for users, products, orders, payments, and admin statistics.

I built this mainly as a learning project to practise connecting a React app to an Express API, handling authentication with JWT, and working with MongoDB.

## What is included

- User registration and login with hashed passwords and JWT authentication
- Email notification after registration
- Product listing and individual product pages
- Admin-only product creation, editing, and deletion
- Image uploads through Cloudinary
- Order creation and order-status updates
- Razorpay order creation and payment-signature verification
- A small admin analytics endpoint
- Seed data for getting the project running quickly

## Tech used

- Frontend: React, Vite, React Router, Redux Toolkit
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Authentication: JSON Web Tokens and bcryptjs
- Other services: Cloudinary, Nodemailer, Razorpay

## Project structure

```text
Authentication_Project/
|-- frontend/     # React + Vite application
|-- backend/      # Express API and MongoDB models
`-- package.json  # Commands for running both applications together
```

## Getting started

### 1. Install packages

From the project root, run:

```bash
npm install
```

This installs the dependencies for both `frontend` and `backend`.

### 2. Add environment variables

Create a `.env` file inside the `backend` folder. It should contain the values needed for MongoDB, JWT, email, Cloudinary, and Razorpay.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

For Gmail, use an app password instead of your normal account password.

### 3. Seed the database (optional)

```bash
cd backend
npm run seed
```

The seed script clears the existing users and products before adding sample products and an admin account. The seeded admin login is:

```text
Email: admin@shopnest.com
Password: password123
```

Change or remove these credentials before using the project anywhere beyond local development.

### 4. Start the app

Return to the root directory and run:

```bash
npm run dev
```

The React app runs at `http://localhost:5173` and the API runs at `http://localhost:5000`. Vite proxies `/api` requests to the backend while developing.

## Available commands

```bash
npm run dev          # start frontend and backend together
npm run dev:client   # start only the Vite frontend
npm run dev:server   # start only the Express backend
npm run build        # create a production frontend build
```

Inside `backend`, `npm run seed` imports the sample data.

## API overview

| Area | Routes |
| --- | --- |
| Authentication | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/user` (admin) |
| Products | `GET /api/products`, `GET /api/products/:id`, plus admin-only create, update, and delete actions |
| Orders | `POST /api/orders`, `GET /api/orders/myorders`, admin order listing and status updates |
| Payments | `POST /api/paymnet`, `POST /api/paymnet/verify` |
| Analytics | `GET /api/analystics` (admin) |

Protected requests need an `Authorization` header containing a valid bearer token. Product upload requests use the `image` form-data field.

## Notes

- The payment and analytics route names intentionally reflect the paths currently registered in `backend/index.js`: `paymnet` and `analystics`.
- Razorpay credentials should use test keys while developing.
- The project currently focuses on the customer-facing catalogue and API. A complete checkout and admin dashboard UI can be added on top of the existing backend routes.


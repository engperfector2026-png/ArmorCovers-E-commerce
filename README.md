# ARMORCOVERS Marketplace

ARMORCOVERS Marketplace is a full-stack e-commerce platform that connects buyers and sellers through a secure online marketplace. Sellers can register, manage their stores, and list products, while customers can browse products, add items to cart, place orders, and manage their purchases.

---

## Features

### Customer Features
- User Registration and Login
- Browse Products
- Search Products
- Product Categories
- Product Details Page
- Shopping Cart
- Checkout System
- Order Placement
- Order History
- Responsive Design

### Seller Features
- Seller Registration
- Seller Login
- Seller Dashboard
- Product Management
  - Add Products
  - Edit Products
  - Delete Products
- Profile Management
- Store Management
- Sales Statistics

### Admin Features
- Manage Users
- Manage Sellers
- Manage Products
- Manage Orders
- Marketplace Monitoring

---

## Technology Stack

### Frontend
- React
- TypeScript
- React Router
- Axios
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Database
- MongoDB Atlas

---

## Project Structure

```bash
ARMORCOVERS/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/armorcovers-marketplace.git
cd armorcovers-marketplace
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=mongodb+srv://AmorCover:<db_password>@cluster0.dy36w9a.mongodb.net/?appName=Cluster0

JWT_SECRET=your_jwt_secret

MPESA_CONSUMER_KEY=your_consumer_key

MPESA_CONSUMER_SECRET=your_consumer_secret

MPESA_PASSKEY=your_passkey

**Run backend server**:

```bash
npm run dev

Server runs on:

```bash
http://localhost:5000


## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Authentication

The system uses:

- JWT Tokens
- Protected Routes
- Role-Based Access Control
- Seller Authentication
- Customer Authentication

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Products

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Cart

```http
GET    /api/cart
POST   /api/cart
DELETE /api/cart/:id
```

### Orders

```http
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
```

### Sellers

```http
POST /api/sellers/register
POST /api/sellers/login
GET  /api/sellers/dashboard
PUT  /api/sellers/profile
```

---

## Marketplace Workflow

### Customer

1. Register/Login
2. Browse Products
3. Add Products to Cart
4. Proceed to Checkout
5. Enter Delivery Details
6. Place Order
7. Track Orders

### Seller

1. Register Seller Account
2. Login
3. Access Seller Dashboard
4. Add Products
5. Manage Inventory
6. View Sales
7. Update Store Profile

---

## Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- Protected API Routes
- Input Validation
- Error Handling
- Secure Environment Variables

---

## Future Improvements

- Mpesa Payment Integration
- Product Reviews and Ratings
- Wishlist
- Notifications
- AI Product Recommendations
- Seller Analytics Dashboard
- Multi-Vendor Commission System
- Real-Time Chat
- Mobile Application

---

## Footer Pages

The marketplace includes:

- About Us
- Contact Us
- Privacy Policy
- Terms & Conditions
- Social Media Links

---

## Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

**Elijah Wagah**
phone number: 0796985894
email address: engperfector2026@gmail.com

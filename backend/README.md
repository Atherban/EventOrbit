Below is a **clean, production-grade `README.md`** generated from your uploaded backend document.
All unnecessary wording, filler text, and redundant explanations have been removed — only **professional, concise, developer-ready documentation** remains.

Cited from your file:

---

# **EventOrbit – Backend API Documentation**

A backend service built using **Node.js, Express, and MongoDB** to power event-based vendor services, bookings, reviews, and user management.

---

# **1. Technology Stack**

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Multer (optional for file uploads)**
- **Morgan (logging)**
- **CORS**
- **Dotenv**

---

# **2. Installation & Setup**

### **Clone & Install**

```bash
git clone <repo-url>
cd EventOrbit_backend
npm install
```

### **Environment Variables (`.env`)**

```
PORT=3000
MONGO_URI=<your_mongodb_url>
JWT_SECRET=<your_jwt_secret>
```

### **Start Server**

```bash
npm run dev   # with nodemon
npm start     # production mode
```

---

# **3. Dependencies**

```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.19.0",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^8.0.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5"
  }
}
```

### **Dev Dependencies**

```json
{
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

---

# **4. Base URL**

```
/api
```

Local Development:

```
http://localhost:3000/api
```

---

# **5. Authentication**

All protected routes require:

```
Authorization: Bearer <token>
```

---

# **6. API Endpoints**

---

# **6.1 Auth APIs**

### **Register User**

```
POST /api/auth/register
```

**Body:**

```json
{
  "name": "Nikunj",
  "email": "nikunj@example.com",
  "password": "Password123",
  "role": "client",
  "city": "Indore",
  "phone": "9876543210"
}
```

### **Login**

```
POST /api/auth/login
```

### **Get Current User**

```
GET /api/auth/me
```

---

# **6.2 User APIs**

### **Get My Profile**

```
GET /api/users/me
```

### **Update My Profile**

```
PATCH /api/users/me
```

**Body example:**

```json
{ "phone": "9999999999" }
```

---

# **6.3 Service APIs (Vendor Listings)**

### **Create Service (Vendor Only)**

```
POST /api/services
```

### **Get All Services (Public)**

```
GET /api/services
```

**Optional Query Parameters:**

- city
- category
- minPrice
- maxPrice
- sortBy
- page / limit

### **Get Service by ID**

```
GET /api/services/:id
```

### **Update Service**

```
PATCH /api/services/:id
```

### **Delete Service**

```
DELETE /api/services/:id
```

---

# **6.4 Booking APIs**

### **Create Booking (Client Only)**

```
POST /api/bookings
```

### **Get My Bookings (Client or Vendor)**

```
GET /api/bookings
```

### **Get Booking by ID**

```
GET /api/bookings/:id
```

### **Update Booking Status (Vendor/Admin)**

```
PATCH /api/bookings/:id/status
```

Allowed values:
`pending`, `accepted`, `rejected`, `cancelled`, `completed`

---

# **6.5 Review APIs**

### **Add Review (Client Only)**

```
POST /api/reviews
```

### **Get Vendor Reviews**

```
GET /api/vendors/:id/reviews
```

---

# **6.6 Messaging (Chat) APIs**

### **Send Message**

```
POST /api/messages
```

### **Get Conversation with User**

```
GET /api/messages/conversation/:userId
```

---

# **6.7 Admin APIs**

### **Platform Stats**

```
GET /api/admin/stats
```

### **List Users**

```
GET /api/admin/users
```

### **Block / Unblock User**

```
PATCH /api/admin/users/:id/block
```

### **Verify Vendor**

```
PATCH /api/admin/vendors/:id/verify
```

---

# **6.8 Upload APIs (Optional)**

### **Upload Image**

```
POST /api/upload/image
```

Form field: `file`

---

# **7. Project Structure (Recommended)**

```
src/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── utils/
 └── server.js
```

---

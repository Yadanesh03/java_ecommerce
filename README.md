# 🛍️ LUXE — Full Stack E-Commerce App
**Spring Boot 3 + React + H2 Database (No external DB needed!)**

---

## 📁 Directory Structure

```
ecommerce/
├── backend/                          ← Spring Boot App
│   ├── pom.xml                       ← Maven dependencies
│   └── src/main/
│       ├── java/com/ecommerce/
│       │   ├── EcommerceApplication.java   ← Entry point
│       │   ├── model/
│       │   │   ├── Product.java
│       │   │   ├── Order.java
│       │   │   └── OrderItem.java
│       │   ├── repository/
│       │   │   ├── ProductRepository.java
│       │   │   └── OrderRepository.java
│       │   ├── service/
│       │   │   ├── ProductService.java
│       │   │   └── OrderService.java
│       │   ├── controller/
│       │   │   ├── ProductController.java
│       │   │   └── OrderController.java
│       │   └── config/
│       │       └── DataSeeder.java         ← Auto-loads 18 products
│       └── resources/
│           └── application.properties
│
├── frontend/                         ← React App
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx                   ← Router
│       ├── main.jsx
│       ├── index.css                 ← Global styles
│       ├── api.js                    ← Axios API calls
│       ├── context/
│       │   └── CartContext.jsx       ← Global cart state
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ProductCard.jsx
│       │   └── Footer.jsx
│       └── pages/
│           ├── Home.jsx              ← Hero + Featured
│           ├── Products.jsx          ← Browse + filter
│           ├── ProductDetail.jsx     ← Single product
│           ├── Cart.jsx              ← Cart page
│           ├── Checkout.jsx          ← Order form
│           ├── OrderSuccess.jsx      ← Confirmation
│           └── Admin.jsx             ← Admin dashboard
│
├── start-windows.bat                 ← One-click start (Windows)
├── start-mac-linux.sh               ← One-click start (Mac/Linux)
└── README.md
```

---

## ✅ Prerequisites

Make sure you have these installed:
- **Java JDK 17+** — check with `java -version`
- **Maven** — comes bundled via `mvnw` (no install needed!)
- **Node.js + npm** — check with `node -v` and `npm -v`

---

## 🚀 How to Run (Step by Step)

### Option A: One-Click Start (Easiest)

**Windows:**
```
Double-click: start-windows.bat
```

**Mac/Linux:**
```bash
chmod +x start-mac-linux.sh
./start-mac-linux.sh
```

---

### Option B: Manual (Two Terminals in VS Code)

**Terminal 1 — Backend:**
```bash
cd backend

# Windows:
mvnw.cmd spring-boot:run

# Mac/Linux:
./mvnw spring-boot:run
```

Wait until you see: `Started EcommerceApplication in X seconds`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 URLs

| Page | URL |
|------|-----|
| 🏠 Home | http://localhost:5173 |
| 🛍️ Shop | http://localhost:5173/products |
| 🛒 Cart | http://localhost:5173/cart |
| 👨‍💼 Admin | http://localhost:5173/admin |
| 🔌 API | http://localhost:8080/api/products |
| 🗄️ H2 Database Console | http://localhost:8080/h2-console |

### H2 Console Login:
- URL: `jdbc:h2:mem:ecommercedb`
- Username: `sa`
- Password: (leave blank)

---

## 📦 Features

### Customer Side
- ✅ Beautiful homepage with hero section & categories
- ✅ Browse all products with category filter + sort
- ✅ Search products by name, category, description
- ✅ Product detail page with add-to-cart
- ✅ Shopping cart (persists in localStorage)
- ✅ Checkout form with validation
- ✅ Order confirmation page

### Admin Side (http://localhost:5173/admin)
- ✅ Dashboard with stats (products, orders, revenue)
- ✅ Add / Edit / Delete products
- ✅ View all orders
- ✅ Update order status (PENDING → PROCESSING → SHIPPED → DELIVERED)

### Technical
- ✅ RESTful API (GET, POST, PUT, DELETE, PATCH)
- ✅ H2 in-memory database (zero setup!)
- ✅ 18 pre-loaded sample products across 5 categories
- ✅ Spring Data JPA with CRUD operations
- ✅ CORS configured for local development
- ✅ Responsive design

---

## 🔌 API Endpoints

```
GET    /api/products              → All products
GET    /api/products?search=mac   → Search products
GET    /api/products?category=Electronics
GET    /api/products/{id}         → Single product
GET    /api/products/featured     → Featured products
GET    /api/products/categories   → All category names
POST   /api/products              → Create product
PUT    /api/products/{id}         → Update product
DELETE /api/products/{id}         → Delete product

POST   /api/orders                → Create order
GET    /api/orders                → All orders
GET    /api/orders/{id}           → Single order
PATCH  /api/orders/{id}/status    → Update status
```

---

## 🗄️ Database

Uses **H2 in-memory database** — no MySQL, PostgreSQL, or Docker needed!
- Resets when backend restarts (sample data re-loads automatically)
- View it at: http://localhost:8080/h2-console

---

## 📚 Syllabus Coverage

This project covers these course units:
| Unit | Topics Used |
|------|-------------|
| Unit 1 | Streams, Lambdas, Collections, Java records |
| Unit 2 | JDBC → JPA/Hibernate, Spring Data, CRUD |
| Unit 3 | RESTful API, Spring Boot, JSON handling |
| Unit 4 | Spring Framework IoC, Dependency Injection, MVC |
| Unit 5 | Design patterns (Repository, Service) |

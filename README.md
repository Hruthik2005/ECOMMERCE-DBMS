# Shopping Cart Web App

## Installation

...

## Usage  <-- This must be preceded by a blank line
...
```

If you'd like, I can fix this and give you a clean `.md` file you can upload directly.

---

### Or you can copy the corrected layout below and replace your current README.md with it:

````markdown
# Shopping Cart Web App

A simple and responsive shopping cart web application that supports user authentication, product browsing, cart management, and a checkout form. Built using **Node.js (Express)**, **MySQL**, and **vanilla HTML/CSS/JavaScript**.

---

## 📝 Description

This project is a basic e-commerce prototype demonstrating full-stack web development. It lets users register, log in, browse products, manage their cart, and checkout (frontend only).

---

## 📂 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Features](#features)
- [Requirements](#requirements)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Hruthik2005/ECOMMERCE-DBMS
cd ECOMMERCE-DBMS
````

### 2. Install backend dependencies

```bash
npm install
```

### 3. Set up the MySQL database

* Make sure MySQL server is running.
* Open `server.js` and configure your MySQL credentials.
* Run these SQL files in order:

```sql
init_db.sql       -- Creates user_auth DB and users table
products_db.sql   -- Creates and seeds products table
cart_db.sql       -- Creates cart_items table with sample entries
```

### 4. Start the server

```bash
node server.js
```

Server will run at: [http://localhost:3000](http://localhost:3000)

### 5. Open frontend

Open `index.html` in your browser.

---

## 🚀 Usage

1. Register via `register.html`.
2. Login using `login.html`.
3. Browse products on `index.html`.
4. Add items to your cart.
5. View cart using `cart.html`.
6. Checkout with `checkout.html`.

---

## 📸 Screenshots

> Replace these with your actual screenshots:

**🔑 Register Page**
![Register Page](screenshots/register.png)

**🔐 Login Page**
![Login Page](screenshots/login.png)

**🛍️ Product Browsing**
![Home Page](screenshots/home.png)

**🛒 Shopping Cart**
![Cart Page](screenshots/cart.png)

**💳 Checkout Page**
![Checkout Page](screenshots/checkout.png)

---

## ✨ Features

* User registration and login
* Product browsing by category
* Add/remove items to/from cart
* Cart management
* Checkout (frontend only)
* Responsive layout

---

## 📦 Requirements

* Node.js 18+
* MySQL
* NPM

---

## ⚙️ Configuration

Update MySQL connection in `server.js` as needed.

### Dependencies

* express
* mysql
* cors
* bcrypt

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, make changes, and open a pull request.

---

## 📄 License

ISC License. See `package.json`.

---

## 📬 Contact

**Hruhtik K Taravi**
GitHub: [@Hruhtik2005](https://github.com/Hruthik2005)

---

## 🙏 Acknowledgments

* Express
* MySQL
* bcrypt
* UI and backend logic by Hruhtik K Taravi

---

> 💡 *Data is stored locally. No real payment processing is implemented.*

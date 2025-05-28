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

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/Hruthik2005/ECOMMERCE-DBMS
cd ECOMMERCE-DBMS
````

### 2. Install backend dependencies

```bash
npm install
```

### 3. Set up the MySQL database

* Ensure MySQL server is running.
* Open `server.js` and configure your MySQL credentials.
* Run these SQL files in order:

```sql
init_db.sql       -- Creates user_auth DB and users table  
products_db.sql   -- Creates and seeds products table  
cart_db.sql       -- Creates cart_items table with sample entries  
```

### 4. Start the backend server

```bash
node server.js
```

Server will run at: [http://localhost:3000](http://localhost:3000)

### 5. Open frontend

Open `index.html` in your browser (or use a local server if needed).

---

## 🚀 Usage

1. Register via `register.html`.
2. Login via `login.html`.
3. Browse products on the homepage (`index.html`).
4. Add products to your cart.
5. View cart using `cart.html`.
6. Proceed to checkout through `checkout.html`.

---

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
* Add/remove products from cart
* View and manage shopping cart
* Checkout form (no payment)
* Responsive layout using pure HTML/CSS/JS

---

## 📦 Requirements

* Node.js 18+
* MySQL Server
* NPM (Node Package Manager)

---

## ⚙️ Configuration

* **Database**: Edit MySQL credentials in `server.js`
* **Dependencies**: Check `package.json`

```json
"dependencies": {
  "express": "^4.x",
  "mysql": "^2.x",
  "cors": "^2.x",
  "bcrypt": "^5.x"
}
```

---

## 🤝 Contributing

Pull requests and suggestions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Open a pull request

Please follow clean code practices and include comments where necessary.

---

## 📄 License

This project is licensed under the **ISC License**. See `package.json` for details.

---

## 📬 Contact

**Hruhtik K Taravi**
GitHub: [@Hruhtik2005](https://github.com/Hruthik2005)

---

## 🙏 Acknowledgments

* [Express](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
* Project development by Hruhtik K Taravi

---

> ⚠️ **Note**: This is a demo project for learning purposes. No real payment processing is implemented.

```




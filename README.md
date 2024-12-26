# E-Commerce Website (MERN Stack)

**E-Commerce Website (MERN Stack)** is a modern and fully functional online store built using **MongoDB**, **Express.js**, **React.js**, and **Node.js** (MERN stack). This project is divided into three parts:

- **Frontend**: A React-based user interface where customers can browse products, add items to their cart, and checkout.
- **Backend**: A Node.js and Express server that handles all application logic, such as managing products, user authentication, and cart operations. It is connected to a MongoDB database.
- **Admin Panel**: A dedicated dashboard for administrators to manage product listings, orders, and user accounts.

This repository contains the frontend of the application. The backend and admin panel are in separate repositories.

---

## 🌟 Features:
- **Product Browsing**: View product listings, filter by category, and view product details.
- **Shopping Cart**: Add items to the cart, update quantities, and view the cart's total value.
- **User Authentication**: User login, registration, and secure session management.
- **Order Management**: Users can place orders and view their order history.
- **Admin Panel**: Admin can manage products, orders, and users (not included in this repo).

---

## 💻 Technologies Used:
- **Frontend**: 
  - **React.js** for the user interface.
  - **Redux** for state management.
  
- **Backend**: 
  - **Node.js** with **Express.js** for the server.
  - **MongoDB** for the database, with **Mongoose** as the ORM.
  - **JWT** for user authentication.
  
- **Admin Panel**: A dashboard  built to manage products, users, and orders.

---

## 🎯 Purpose:
The purpose of this project is to showcase a full-stack e-commerce application built using the MERN stack. It demonstrates how to build a modern web application with a focus on user-friendly interfaces, secure authentication, and dynamic cart management.

---

## 🚀 Demo:
[View Live Demo (Frontend)](https://e-commerce-website-frontend-e1xa.onrender.com/)

---

## 🔧 Installation Instructions:

To run this project locally, you will need to set up the **Frontend**, **Backend**, and **Admin Panel** separately.

### **Frontend Installation**:

1. Clone the repository:
    ```bash
    git clone https://github.com/Dhaval-loncha/E_Commerce_Website.git
    ```

2. Navigate to the `frontend` folder:
    ```bash
    cd E_Commerce_Website/frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the frontend:
    ```bash
    npm run dev
    ```

   This will start the app on `http://localhost:5173`.

### **Backend Installation**:

1. Clone the backend repository (if you don't have the backend repository, you can set it up by following the [MERN backend guide](https://www.digitalocean.com/community/tutorials)).
    ```bash
    git clone https://github.com/Dhaval-loncha/E_Commerce_Backend.git
    ```

2. Navigate to the `backend` folder:
    ```bash
    cd E_Commerce_Backend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up your `.env` file with necessary environment variables (e.g., database URI, JWT secret).

5. Run the backend server:
    ```bash
    npm start
    ```

   This will start the backend server on `http://localhost:5000` (or the port you configured).

### **Admin Panel Installation**:

1. Clone the admin panel repository (if you don't have the admin repository, you can create it following a similar MERN stack setup).
    ```bash
    git clone https://github.com/Dhaval-loncha/E_Commerce_Admin.git
    ```

2. Navigate to the `admin` folder:
    ```bash
    cd E_Commerce_Admin
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the admin panel:
    ```bash
    npm run dev
    ```

   This will start the admin panel on `http://localhost:5174`.

---

## 📝 License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ using MERN Stack (MongoDB, Express, React, Node.js)**

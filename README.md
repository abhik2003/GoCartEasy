
# GoCartEasy

CoCartEasy is a MERN stack E-Commerce Web-application  designed to provide a seamless shopping experience featuring Registration, Login, Product Categories and Search, Shopping Cart, and a Checkout process. Incorporated an admin dashboard for order tracking, and empower administrators to update, delete, and add products and categories with ease. For secure transactions, it integrates with Braintree as the payment gateway.


## Deployment

You can visit the deployed application at the following link:

[GoCartEasy Deployment Link](https://go-cart-easy.vercel.app/)

## Tech Stack

- **MERN**: MongoDB, Express.js, React, Node.js
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Bootstrap
- **Payment Gateway**: Braintree

## Features

### User Features

- **Search Products**: Easily search for products using keywords.
- **Add to Cart**: Add desired products to the cart for purchase.
- **Filtering**: Filter products based on categories, price range, and other attributes.
- **Order Tracking**: Track and manage your orders in your user profile.

### Admin Features

- **Admin Panel**: Access a dedicated admin panel to manage the store.
- **Product Management**: Create, update, and delete products.
- **Category Management**: Create, update, and delete product categories.
- **Order Management**: Track and manage customer orders.


# Setup

This guide will walk you through the setup process for the GoCartEasy eCommerce website project. Follow the steps below to get the application up and running on your local machine.

## Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- npm (Node Package Manager)

## Installation

### 1. Clone the repository

Clone the repository to your local machine using Git.

```bash
git clone https://github.com/abhik2003/GoCartEasy.git
cd GoCartEasy
```

### 2. Backend Setup

Navigate to the `api` directory and install the required dependencies.

```bash
cd api
npm install
```

### 3. Environment Variables

Create a `.env` file in the `api` directory and add the following variables:

```
PORT = 8080
DEV_MODE = development
MONGO_URL = mongodb_url_here
JWT_SECRET_KEY = jwt_secret_key_value
BRAIN_TREE_MERCHANT_ID = merchant_id
BRAIN_TREE_PUBLIC_KEY = publi_key
BRAIN_TREE_PRIVATE_KEY = private_key
```
Create a `.env` file in the `client` directory and add the following variable:

```
REACT_APP_API = https://localhost:8080
```
### 4. Start the Backend Server

Start the backend server by running:

```bash
npm start
```
### 5. Frontend Setup

Open a new terminal window, navigate to the `client` directory, and install the required dependencies.

```bash
cd client
npm install
```

### 6. Start the Frontend Server

Start the frontend server by running:

```bash
npm start
```

### 7. Running the Application

- Visit `http://localhost:3000` in your browser to view the application.
- The backend server runs on `http://localhost:8080`.

## Usage

### User Registration and Login

Users can register for a new account or log in with an existing account.

### Browsing Products

Browse through various products and use the search bar for specific queries.

### Admin Actions

Log in with admin credentials to access the admin panel for managing products and orders.

## Contact

For any inquiries, please reach out to:

- Email: abhik03mj@gmail.com
- GitHub: [abhik2003](https://github.com/abhik2003)

---

Thank you for using GoCartEasy!

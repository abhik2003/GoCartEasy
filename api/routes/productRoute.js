const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getAllProductsController, getSingleProductController, getProductPhotoController, deleteProductController, updateProductController, filterProductController, productCountController, productListController, searchProductController, realtedProductController, braintreeTokenController, braintreePaymentController } = require('../controllers/productController');
const formidable = require('express-formidable');
const { updateCategoryController } = require('../controllers/categoryController');


const router = express.Router();

//routes
//1. Create product
router.post('/create-product', formidable(), createProductController);


//2. Get products
router.get('/get-product', getAllProductsController);

//3. single product
router.get('/get-product/:slug', getSingleProductController);

// 4. Get photo
router.get('/product-photo/:pid', getProductPhotoController);

//5. Delete product
router.delete('/delete-product/:id', deleteProductController);

//6. Update product
router.put('/update-product/:id', formidable(), updateProductController);

//7. Filter product
router.post('/filter-product', filterProductController);

//8. Product count
router.get('/product-count', productCountController);

//9. Product per page
router.get('/product-list/:page', productListController);

//10. Search product
router.get('/search/:keyword', searchProductController);

//11. Similar prodoct
router.get('/related-product/:pid/:cid', realtedProductController);

//12. Payment route : token
router.get('/braintree/token', braintreeTokenController);

//13. Payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController);

module.exports = router;
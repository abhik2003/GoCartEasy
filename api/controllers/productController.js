const slugify = require("slugify");
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");
const fs = require('fs');
const router = require("../routes/authRoute");
const braintree = require("braintree");
const dotenv = require("dotenv");

dotenv.config();

const createProductController = async (req, res) => {
    try {
        // return res.status(202).send({ message: "Hi" });
        const { name, description, price, category, quantity } = req.fields;  //shippng optional
        const { photo } = req.files;

        //validation
        if (!name) return res.status(500).send({ error: 'Name is required' });
        if (!description) return res.status(500).send({ error: 'Description is required' });
        if (!price) return res.status(500).send({ error: 'Price is required' });
        if (!category) return res.status(500).send({ error: 'Category is required' });
        if (!quantity) return res.status(500).send({ error: 'Quantity is required' });
        if (photo && photo.size > 1000000) return res.status(500).send({ error: 'Photo size must be less than 10MB' })

        console.log(req.fields);
        //save the data in database
        const product = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in product creation'
        })
    }
}

//get all products
const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: 'All products',
            products,
            countTotal: products.length
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in get all products'
        })
    }
}


//get single product
const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModel
            .findOne({ slug })
            .populate('category')
            .select('-photo');

        res.status(200).send({
            success: true,
            message: 'Single product fetched successfully',
            product
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in get single product'
        })
    }
}
//get product photo
const getProductPhotoController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel
            .findById(pid)
            .select('photo');

        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
        res.status(200).send({
            success: true,
            message: 'Single product\'s photo fetched successfully',
            product
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error in get single product photo'
        })
    }
}


//delete a product
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Error while deleting product'
        })
    }
}

//update product
const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;  //shipping optional
        const { photo } = req.files;

        const { id } = req.params;
        //validation
        if (!name) return res.status(500).send({ error: 'Name is required' });
        if (!description) return res.status(500).send({ error: 'Description is required' });
        if (!price) return res.status(500).send({ error: 'Price is required' });
        if (!category) return res.status(500).send({ error: 'Category is required' });
        if (!quantity) return res.status(500).send({ error: 'Quantity is required' });
        if (photo && photo.size > 1000000) return res.status(500).send({ error: 'Photo size must be less than 10MB' })

        console.log(category);

        //save the data in database
        if (photo) {
            //photo object
            console.log(`With photo ${photo.type}`);
            const productPhoto = {
                data: fs.readFileSync(photo.path),
                contentType: photo.type
            }
            const product = await productModel.findByIdAndUpdate(id, { ...req.fields, slug: slugify(name), photo: productPhoto }, { new: true });

        }
        else {
            delete req.fields.photo;
            const existingProduct = await productModel.findById(id);
            const product = await productModel.findByIdAndUpdate(id,
                { ...req.fields, slug: slugify(name) },
                { new: true });

        }


        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while updating product'
        })
    }
}


// filter product
const filterProductController = async (req, res) => {
    try {
        const { checked, pricerange } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (pricerange.length) args.price = { $gte: pricerange[0], $lte: pricerange[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            message: 'Filterred products',
            products,
            countTotal: products.length
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in filter products'
        })
    }
}

//product count
const productCountController = async (req, res) => {
    try {
        const total = await productModel
            .find({})
            .estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in products count'
        })
    }
}

const productListController = async (req, res) => {
    try {
        const perPage = 4;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in products per page'
        })
    }
}
const searchProductController = async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const result = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            })
            .select("-photo")
        res.status(200).send({
            success: true,
            products: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in search products'
        })
    }
}

// similar products
const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid } //exclude the current product
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
};

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAIN_TREE_MERCHANT_ID,
    publicKey: process.env.BRAIN_TREE_PUBLIC_KEY,
    privateKey: process.env.BRAIN_TREE_PRIVATE_KEY,
});

const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send(response);
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
};

const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((item) => { total += item.price });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
        function (error, result) {
            if (result) {
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id,
                }).save()

                res.json({ok: true})
            }
            else {
                res.status(500).send(error)
            }
        }
        
        )
    } catch (error) {
        
    }
};


module.exports = { createProductController, getAllProductsController, getSingleProductController, getProductPhotoController, deleteProductController, updateProductController, filterProductController, productCountController, productListController, searchProductController, realtedProductController, braintreeTokenController, braintreePaymentController };
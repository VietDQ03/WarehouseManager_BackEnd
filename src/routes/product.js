import express from "express";
import { ProductController } from "../controllers/index.js";

const productRouter = express.Router();

// GET: /products -> Get all products
productRouter.get("/", ProductController.getProducts);

// GET: /products/:id -> Get a product by Id
productRouter.get("/:id", ProductController.getProductById);

// POST: /products -> Create a new product
productRouter.post("/", ProductController.createProduct);

// PUT: /products/:id
productRouter.put("/:id", ProductController.editProduct);

// DELETE: /products/:id
productRouter.delete("/:id", ProductController.deleteProduct);

// GET: /products/code/:id -> Get a product by code
productRouter.get("/code/:id", ProductController.getProductByCode);

// GET: /products/supplier/:id -> Get products by suppliers
productRouter.get("/supplier/:id", ProductController.getProductBySupplier);
export default productRouter;

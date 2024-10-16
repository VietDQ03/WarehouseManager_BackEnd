import { ProductRepo } from "../services/index.js";
// GET: /products
const getProducts = async (req, res) => {
  try {
    res.status(200).json(await ProductRepo.list());
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

// GET: /products/1
const getProductById = async (req, res) => {
  try {
    res.status(200).json(await ProductRepo.getById(req.params.id));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const getProductByCode = async (req, res) => {
  try {
    res.status(200).json(await ProductRepo.getByCode(req.params.id));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const getProductBySupplier = async (req, res) => {
  try {
    res.status(200).json(await ProductRepo.getBySupplier(req.params.supplier));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

// POST: /products
const createProduct = async (req, res) => {
  try {
    // Get object from request body

    const {
      code,
      name,
      images,
      supplier,
      description,
      quantity,
      size,
      material,
      in_price,
      out_price,
    } = req.body;
    const newUser = await ProductRepo.create({
      code,
      name,
      images,
      supplier,
      description,
      quantity,
      size,
      material,
      in_price,
      out_price,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

// PUT: /products/1
const editProduct = async (req, res) => {
  try {
    res.status(200).json(await ProductRepo.edit(req.params.id, req.body));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

// DELETE: /products/1
const deleteProduct = async (req, res) => {
  try {
    res.status(200).json(await ProductRepo.deleteProduct(req.params.id));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
  getProductByCode,
  getProductBySupplier,
};

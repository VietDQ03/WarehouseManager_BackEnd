import { SupplierRepo } from "../services/index.js";

const getSupplier = async (req, res) => {
  try {
    const current = parseInt(req.query.current, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    const result = await SupplierRepo.list(current, pageSize);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSupplierById = async (req, res) => {
  try {
    res.status(200).json(await SupplierRepo.getById(req.params.id));
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};


const createSupplier = async (req, res) => {
  try {


    const { code,name,logo, description,phone ,address,email,website, } = req.body;
    const newUser = await SupplierRepo.create({
        code,
        name,
        logo,
        description,
        phone ,
        address,
        email,
        website,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};


const editSupplier = async (req, res) => {
  try {
    res.status(200).json(await SupplierRepo.edit(req.params.id, req.body));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};


const deleteSupplier = async (req, res) => {
  try {
    res.status(200).json(await SupplierRepo.deleteProduct(req.params.id));
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    });
  }
};

export default {
  getSupplier,
  getSupplierById,
  createSupplier,
  editSupplier,
  deleteSupplier,
};

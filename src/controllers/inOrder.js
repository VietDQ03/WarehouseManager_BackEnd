import { InOrderRepo } from "../services/index.js";

  //
  // GET: /products/1
  const getById = async (req, res) => {
    try {
      res.status(200).json(await InOrderRepo.getById(req.params.id));
    } catch (error) {
      res.status(500).json({
        message: error.toString(),
      });
    }
  };
  
  const getByProductId = async (req, res) => {
    try {
      res.status(200).json(await InOrderRepo.getByCode(req.params.id));
    } catch (error) {
      res.status(500).json({
        message: error.toString(),
      });
    }
  };
  
  const getBySupplier = async (req, res) => {
    try {
      res.status(200).json(await InOrderRepo.getBySupplier(req.params.id));
    } catch (error) {
      res.status(500).json({
        message: error.toString(),
      });
    }
  };
  
  // POST: /products
  const create = async (req, res) => {
    try {
      // Get object from request body
  
      const {
        product,
        supplier,
        in_price,
        quantity_real,
        quantity_doc,
        staff, 
        deliver,
        invoice
      } = req.body;
      const newUser = await InOrderRepo.create({
        product,
        supplier,
        in_price,
        quantity_real,
        quantity_doc,
        staff, 
        deliver,
        invoice
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.toString() });
    }
  };
  
  // PUT: /products/1
  const edit = async (req, res) => {
    try {
      res.status(200).json(await InOrderRepo.edit(req.params.id, req.body));
    } catch (error) {
      res.status(500).json({
        error: error.toString(),
      });
    }
  };
  
  // DELETE: /products/1
  const del = async (req, res) => {
    try {
      res.status(200).json(await InOrderRepo.del(req.params.id));
    } catch (error) {
      res.status(500).json({
        error: error.toString(),
      });
    }
  };
  const getByDate = async (req, res) => {
    try {
        const orders = await InOrderRepo.getByDate(req.params.date);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
};
const getByMonth = async (req, res) => {
  try {
      const { year, month } = req.params;
      const orders = await InOrderRepo.getByMonth(year, month);
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ message: error.toString() });
  }
};
  
  export default {
   getAll,
   getById,
   getByProductId,
   getBySupplier,
   create,
   edit,
   del,
   getByDate,
   getByMonth,
  };
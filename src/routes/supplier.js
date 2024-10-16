import express from 'express';
import { SupplierController } from '../controllers/index.js';

const supplierRouter = express.Router();

supplierRouter.get('/', SupplierController.getSupplier);

supplierRouter.get('/:id', SupplierController.getSupplierById);

supplierRouter.post('/', SupplierController.createSupplier);

supplierRouter.put("/:id", SupplierController.editSupplier);


supplierRouter.delete("/:id", SupplierController.deleteSupplier);

export default supplierRouter;
import Suppliers from "../models/supplier.js";

// Create
const create = async ({
  code,
  name,
  logo,
  description,
  phone ,
  address,
  email,
  website,
}) => {
  try {

    const newSuppliers = await Suppliers.create({
      code,
      name,
      logo,
      description,
      phone,
      address,
      email,
      website,
    });

    return newSuppliers._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

// Get all
const list = async () => {
  try {
    return await Suppliers.find({})
      .exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};


const getById = async (id) => {
  try {
    return await Suppliers.findOne({ _id: id })
      .exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const edit = async (
  id,
  { name, description, phone, address, email, website}
) => {
  try {
    return await Suppliers.findByIdAndUpdate(
      { _id: id },
      { name, description, phone, address, email, website },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteProduct = async (id) => {
  try {
    return await Suppliers.findByIdAndDelete({ _id: id });
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  create,
  list,
  getById,
  edit,
  deleteProduct,
};

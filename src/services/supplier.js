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
const list = async (current = 1, pageSize = 10) => {
  try {
    const skip = (current - 1) * pageSize; // Calculate the number of records to skip
    const total = await Suppliers.countDocuments(); // Total number of records
    const suppliers = await Suppliers.find({})
      .skip(skip) // Skip previous records
      .limit(pageSize) // Limit the number of records returned
      .exec();

    return {
      suppliers,
      total,
      totalPages: Math.ceil(total / pageSize), // Calculate total pages
      currentPage: current, // Current page
      pageSize, // Records per page
    };
  } catch (error) {
    throw new Error(`Error fetching suppliers: ${error.message}`);
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

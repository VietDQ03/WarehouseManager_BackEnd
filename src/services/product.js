import Products from "../models/product.js";

// Create
const create = async ({
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
}) => {
  try {
    // Create new product
    const newProduct = await Products.create({
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
    // Return newProduct object
    return newProduct._doc;
  } catch (error) {
    throw new Error(error.toString());
  }
};

// Get all
const list = async (current = 1, pageSize = 10) => {
  try {
    const skip = (current - 1) * pageSize; // Calculate the number of records to skip
    const total = await Products.countDocuments(); // Total number of records
    const products = await Products.find({})
      .skip(skip) // Skip previous records
      .limit(pageSize) // Limit the number of records returned
      .exec();

    return {
      products,
      total,
      totalPages: Math.ceil(total / pageSize), // Calculate total pages
      currentPage: current, // Current page
      pageSize, // Records per page
    };
  } catch (error) {
    throw new Error(`Error fetching suppliers: ${error.message}`);
  }
};

// Get single Product by Id
const getById = async (id) => {
  try {
    return await Products.findOne({ _id: id }).populate("supplier").exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

//search by suppliers
const getBySupplier = async (code) => {
  try {
    return await Products.findMany({ supplier: supplier })
      .populate("suppliers")
      .exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

// search by code
const getByCode = async (id) => {
  try {
    return await Products.findOne({ code: code }).populate("supplier").exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

const edit = async (
  id,
  {
    images,
    supplier,
    description,
    quantity,
    size,
    material,
    in_price,
    out_price,
  }
) => {
  try {
    return await Products.findByIdAndUpdate(
      { _id: id },
      {
        images,
        supplier,
        description,
        quantity,
        size,
        material,
        in_price,
        out_price,
      },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.toString());
  }
};

const deleteProduct = async (id) => {
  try {
    return await Products.findByIdAndDelete({ _id: id });
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
  getByCode,
  getBySupplier,
};

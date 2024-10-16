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
    const skip = (current - 1) * pageSize;
    
    // Lấy tổng số sản phẩm
    const totalProducts = await Products.countDocuments({});
    
    // Tính tổng số trang
    const totalPages = Math.ceil(totalProducts / pageSize);
    
    // Nếu current vượt quá tổng số trang, trả về trang cuối cùng
    const actualCurrent = current > totalPages ? totalPages : current;
    
    // Lấy sản phẩm với phân trang
    const products = await Products.find({})
      .populate("supplier")
      .skip((actualCurrent - 1) * pageSize)
      .limit(pageSize)
      .exec();
    
    return {
      current: actualCurrent,
      pageSize,
      totalPages,
      totalProducts,
      products,
    };
  } catch (error) {
    throw new Error(error.toString());
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

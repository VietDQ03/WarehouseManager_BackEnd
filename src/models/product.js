import mongoose from "mongoose";

// Image schema for product images
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  caption: {
    type: String,
  },
}, {
  timestamps: true,
});

// Product schema
const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Product code is required"],
    unique: [true, "Product code must be unique"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Product name is required"],
    unique: [true, "Product name must be unique"],
  },
  images: [imageSchema],
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "suppliers",
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  quantity: {
    type: Number,
    default: 0,
    validate: {
      validator: (value) => value >= 0,
      message: "Quantity must be greater than or equal to zero",
    },
  },
  size: {
    type: String,
    required: [true, "Size is required"],
  },
  material: {
    type: String,
    required: [true, "Material is required"],
  },
  in_price: {
    type: Number,
    default: 0,
    validate: {
      validator: (value) => value >= 0,
      message: "Price must be a number and greater than or equal to zero",
    },
  },
  out_price: {
    type: Number,
    default: 0,
    validate: {
      validator: (value) => value >= 0,
      message: "Price must be a number and greater than or equal to zero",
    },
  },
}, {
  timestamps: true,
});

// Create Product model
const Products = mongoose.model("products", productSchema);

// Export model
export default Products;

import mongoose from "mongoose";

// Logo schema for supplier logos with base64 validation
const logoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.startsWith("data:image/") && v.includes(";base64,"),
      message: "Image URL must be a valid Base64 string starting with 'data:image/' and containing ';base64,'",
    },
  },
  caption: {
    type: String,
  },
}, {
  timestamps: true,
});

// Supplier schema
const supplierSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Supplier code is required"],
    unique: [true, "Supplier code must be unique"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Supplier name is required"],
    unique: [true, "Supplier name must be unique"],
  },
  logo: [logoSchema], // Updated to validate base64 format in logo images
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  website: {
    type: String,
    required: [true, "Website is required"],
  },
}, {
  timestamps: true,
});

// Create Supplier model
const Suppliers = mongoose.model("suppliers", supplierSchema);

// Export model
export default Suppliers;

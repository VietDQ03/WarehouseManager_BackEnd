import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    caption: {
      type: String,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const customerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      // required: [true, "customer code is required"],
      // unique: [true, "customer code is unique value"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Customer name is required"],
      unique: [true, "Customer name must be unique"],
    },
    logo: [logoSchema], // Sử dụng logoSchema cho field logo
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    website: {
      type: String,
      required: [true, "Website is required"],
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Customers = mongoose.model("customers", customerSchema);

export default Customers;

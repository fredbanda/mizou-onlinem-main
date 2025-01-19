import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    description: { type: String, required: true },
    media: { type: [String], default: [] },
    category: { type: String, required: true },
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    tags: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      get: (v: mongoose.Schema.Types.Decimal128) =>
        parseFloat(v.toString()).toFixed(2), 
    },
    expense: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      get: (v: mongoose.Schema.Types.Decimal128) =>
        parseFloat(v.toString()).toFixed(2), 
    },
  },
  {
    timestamps: true, 
    toJSON: { getters: true }, 
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;

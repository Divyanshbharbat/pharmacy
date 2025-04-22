import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    price: {
      type: String,
      required: true
    },
    image: String, // URL to the product image
    category: String,
    stock: {
      type: Number,
      default: 0
    }
  }, { timestamps: true });

export default mongoose.model('Product', productSchema);

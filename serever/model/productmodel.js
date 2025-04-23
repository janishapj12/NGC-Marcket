import mongoose from "mongoose";
const Productshema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    stock: { type: Number, default: 0 },

})

 const productsModel = mongoose.model.product || mongoose.model("product" , Productshema)

export default productsModel;
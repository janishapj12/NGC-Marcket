import express from 'express';
import { addproduct, deleteproduct, getProduct, updateProduct } from "../controllers/productcontroller.js";
const routes = express.Router()

routes.post("/addproduct" ,addproduct)
routes.get("/findproduct/:id" , getProduct)
routes.put("/update/:id" , updateProduct)
routes.delete("/delete/:id" , deleteproduct)
export default routes;


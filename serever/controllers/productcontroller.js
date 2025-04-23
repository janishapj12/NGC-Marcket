
import productsModel from '../model/productmodel.js'


export const addproduct = async(req,res) =>{
    const {name,price,description,category,stock} = req.body;
    try{
    if(!name || !price || !category){
        return res.json({success : false , msg : "missing details"})
    }
    const existingProduct = await productsModel.findOne({name})
    if(existingProduct){
        return res.json({success:true , msg : "alrady add product "})

    }
    const product = new productsModel({name,price,description,category,stock})
    product.save()
    return res.status(200).json({msg:"success add product"})
}catch(e){
    res.status(500).json({ success : false ,  msg: e.message });
}

}

export const getProduct = async(req,res) =>{
    try{
        const product = await productsModel.findById(req.user.id)
        if(!product){
            return res.json({success : false , msg :"not product found"})
        }
     res.json(product)
}catch(e){
    res.status(500).json({ success : false ,  msg: e.message });
}

}

export const updateProduct = async(req,res) =>{
    try{
        const product = await productsModel.findByIdAndUpdate(req.user.id  , req.body)
        if(!product){
            return res.json({success : false , msg :"not product found"})
        }
        product.save()
        res.status(200).json({ success : true , product ,  msg:"successfull update" });
    }catch(e){
        res.status(500).json({ success : false ,  msg: e.message });
    }
}

export const deleteproduct = async(req,res) =>{
    try{
        const product = await productsModel.findByIdAndDelete(req.user.id)
        if(!product){
            return res.json({success : false , msg :"not product found"})
        }
        res.status(200).json({ success : true  ,  msg:"successfull detete" });
    }catch(e){
        res.status(500).json({ success : false ,  msg: e.message });
    }
    }

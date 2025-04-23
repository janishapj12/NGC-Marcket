import express from 'express';
import {  login, logout, register } from '../controllers/usercontroller.js';
import userAuth from '../midleware/userath.js';
import userModel from '../model/usermodel.js';


const route = express.Router()
route.post("/register"  , register )
route.post("/login" , login)
route.post("/logout" , logout)

route.get("/profile/:id", userAuth, async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ msg: "User not found!" });
      }
      res.json(
        {
          name:user.name,
          email:user.email,
          password: user.password
        }
      );
    } catch (error) {
      console.error("Profile Route Error:", error);
      res.status(500).json({ msg: "Server error!" });
    }
  });

  route.put("/update/:id" ,userAuth, async(req,res) =>{
    try{
      const user = await userModel.findByIdAndUpdate(req.user.id,req.body , { new: true } )
      if(!user){
        return res.status(400).json({msg : "not find user"})
      }
      return res.json({
        name:user.name,
        email:user.email,
        msg : "success update user"
      } )
    
    }catch(e){
      console.error("Profile Route Error:", e);
      res.status(500).json({ msg: "Server error!" });
    }
  })
  
  route.delete("/delete/:id" , userAuth , async (req,res) =>{
    try{
      const user = await  userModel.findByIdAndDelete(req.user.id)
      if(!user){
        return res.json({msg : "not found user"})

      }
      return res.json({msg : "success delete "})
    }catch(e){
      console.error("Profile Route Error:", e);
      res.status(500).json({ msg: "Server error!" });
    }
  })

export default route;
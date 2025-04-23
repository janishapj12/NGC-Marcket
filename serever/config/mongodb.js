import mongoose from "mongoose";
const MONGODB_URI = "mongodb+srv://pujanijani:1812@usermanagement.fsedqit.mongodb.net/?retryWrites=true&w=majority&appName=UserManagement" ;
const connectdb = async () =>{
    await mongoose.connect(MONGODB_URI);
    console.log("db conected")

}

export default connectdb
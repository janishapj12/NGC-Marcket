import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/usermodel.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, msg: "Missing details" });
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });

        if (user.isAccountVerify) {
            return res.json({ success: false, msg: "Account already verified" });
        }
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            success: true,
            msg: "User registered successfully",
            
            token
        });

    } catch (e) {
        return res.status(500).json({ success: false, msg: e.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Email and password are required",
            errorCode: "MISSING_CREDENTIALS"
        });
    }

    try {
        // Find user
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                errorCode: "INVALID_CREDENTIALS"
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                errorCode: "INVALID_CREDENTIALS"
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        // Set secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        // Return success response with user data (excluding password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
            // Add other non-sensitive fields as needed
        };

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: userResponse,
            token // Optional: Only include if needed for mobile/other clients
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            errorCode: "SERVER_ERROR"
        });
    }
};

export const logout = async (req,res) => {
    try{
        res.clearCookie('token',{
            httpOnly : true,
          secure : process.env.NODE_ENV === 'production',
          sameSite : process.env.NODE_ENV === 'production' ? 'none ' : 'strict' , 
        })
        return res.json({success : true , msg : "logged out"})
    }catch(e){
        res.status(404).json({success:false , msg : e.message })
    }
}



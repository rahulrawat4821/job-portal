import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import getDatauri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// Register Controller
export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;

        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: "Please provide all fields", success: false });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // let profilePicUrl = "";
        // if (req.file) {
        //     const fileUri = getDatauri(req.file);
        //     const cloudResponse = await cloudinary.uploader.upload(fileUri.content); // ✅ Renamed properly
        //     profilePicUrl = cloudResponse.secure_url;
        // }

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            // profile: {
            //     profilePhoto: profilePicUrl, // ✅ Saving the correct URL
            // }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                role: newUser.role,
                profilePhoto: newUser.profile?.profilePic,
            }
        });

    } catch (error) {
        console.log("Error in register:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please provide all fields",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "User does not exist with the current role",
                success: false,
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                token,
                success: true,
            });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


// Logout Controller
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            message: "Error logging out",
            success: false,
        });
    }
};



// update profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({ message: "Please provide all fields", success: false });
        }
        const skillsArray = skills.split(",").map(s => s.trim());
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                succes: false
            })
        }

        // updating data 
        user.fullname = fullname,
            user.email = email,
            user.phoneNumber = phoneNumber,
            user.profile.bio = bio,
            user.profile.skills = skillsArray

        // resume come here later here...

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated succesfully",
            user,
            succes: true
        })
    } catch (error) {
        console.log(error);
    }
}
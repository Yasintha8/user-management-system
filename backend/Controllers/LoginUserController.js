import RegisterUser from "../Models/registerUserModel.js";
import bcrypt from "bcrypt";

export const LoginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await RegisterUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error); 
        res.status(500).json({ message: "Server error during login" });
    }

}

import RegisterUser from "../Models/registerUserModel.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existing = await RegisterUser.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new RegisterUser({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User Registered successfully");
    return res.status(200).json({ message: "User Registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

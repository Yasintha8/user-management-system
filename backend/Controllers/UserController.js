import User from "../Models/UserModel.js";

//--------Get all users-------
export const getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        //if no users
        if(users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        } //display users
        else {
            return res.status(200).json(users);
        }
    } catch (error) {
        console.log("Error fetching users:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

//--------Create new user-------
export const createUsers = async (req, res) => {
    const { name, email, age, address } = req.body;

    try {
        const users = new User({ name, email, age, address });
        await users.save();
        console.log("User added successfully");
        return res.status(201).json({ message: "User added successfully" });
    }catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Unable to add user" });
    }
}

import User from "../Models/UserModel.js";

//--------Get all users-------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ owner: req.user.id }); 
    return res.status(200).json(users); 
  } catch (error) {
    console.log("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//--------Create new user-------
export const createUsers = async (req, res) => {
  console.log("req.user in createUsers:", req.user);

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized: owner not found" });
  }

  const { name, email, age, address } = req.body;

  if (!name || !email || !age || !address) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const users = new User({
      name,
      email,
      age,
      address,
      owner: req.user.id, // 
    });

    const savedUser = await users.save();
    console.log("Saved User:", savedUser);

    return res.status(201).json({
      message: "User added successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Unable to add user", error });
  }
};




//--------Get By Id------------
export const getUserById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ message: "User not found" }); //not available user
        }
        return res.status(200).json(user);  //display user
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

//----------Update User Details------------
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, age, address } = req.body;

    try {
        const users = await User.findByIdAndUpdate(id);
        if(!users){
            return res.status(404).json({ message: "User not found" }); //not available user
        }
        users.name = name;
        users.email = email;
        users.age = age;
        users.address = address;
        await users.save();
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

//-----------Delete User------------
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const users  = await User.findByIdAndDelete(id);
        if(!users){
            return res.status(404).json({ message: "User not found" }); //not available user
        }
        else {
            return res.status(200).json({ message: "User deleted successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.json.status(500).json({ message: "Internal Server Error" });
    }
}
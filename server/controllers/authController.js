import  User  from "../models/User.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import Job from "../models/Job.js";

export async function register(req, res) {
  try {
    const { name, email, password , roll } = req.body;
    const hashedPassword = await hash(password, 10);

    const profileImage = req.file ? req.file.filename :"1753378150931.png" ;

    const user = new User({ name, email, password: hashedPassword, roll,profileImage});
    await user.save();
    res.status(201).json({user});
  } catch (err) {
    res.status(400).json({ error: "Registration failed", details: err.message });
  }
}

export async function login(req, res) {
  console.log("Request body:", req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).send("user not found");

    const ismatch = await compare(password, user.password);

    if (!ismatch) return res.status(401).send("invalid pass");

    const token = jwt.sign(
      { userID: user._id, roll: user.roll },
      process.env.JWT_SECRET,
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
}





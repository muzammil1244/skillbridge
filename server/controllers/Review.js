import  {Review}  from "../models/Review.js"
import User from "../models/User.js"

export const Getreview = async(req,res)=>{



    try{
            const data = await Review.find()

            res.json(data)
    }catch(err){

        res.json(err)
    }



}

export const Addreview = async (req, res) => {
  const userId = req.user.userID; // 👈 from token
  const { Comment,rate  } = req.body;

    if (!Comment || !rate) {
      return res.status(400).json({ error: "Missing Comment or rate" });
    }
  try {
    const user = await User.findById(userId).select("name profileImage");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const review = new Review({
      name: user.name,
      profileImage: user.profileImage,
      Comment,
      rate
      
    });

    await review.save();

    res.status(201).json({ message: "Review created", review });

  } catch (err) {
    res.status(500).json({ message: "Error creating review", err });
  }
};
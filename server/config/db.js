import mongoose from "mongoose"

 export const connectDB =async()=>{

    try{
mongoose.connect(process.env.MONGO_URI,
   
)     
 console.log("db connected")

    }catch(error){
        console.error("MongoDB error:", error.message);
        process.exit(1);    }
}
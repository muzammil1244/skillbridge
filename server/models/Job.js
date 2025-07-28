import mongoose from "mongoose";


const  apllicants = new mongoose.Schema({
    freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    coverlater:{
        type:String
    },
    status:{
        type:String,
        enum:["pending", "accepted", "rejected"],
        default:'pending'
    },
userdata:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"User",
},
rating:{
    type:Number
},

    appliedAt:{
        type:Date,
        default:Date.now,
    },



});


const jobschema = new  mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    skill:{
    type:[String],
    
    },
    budget:Number,
    deadline:Date,
    createBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        ,required:true
    },
    applicants:[apllicants ],
    jobtype:{
        type:String,
        enum:["work from office","work from Home"],
        default:"work from Home"
    },
    salary:{
type:Number
    },
     image: {
    type: String, // Path or filename of uploaded image
  },
  active: {
    type: Boolean,
    default: false, // ✅ Optional
  },
    canapply:{
        type:String
    },
   opportunity:{
    type:Number
   },
    createdAt:{
        type:Date,
        default:Date.now
    },

    




})


 const Job = mongoose.model("Job",jobschema)
 
 
 export default Job;
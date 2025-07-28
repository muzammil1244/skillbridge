
export const JobMiddleware =(req,res,next)=>{
    if (req.user.roll !== "employer") {
  return res.status(403).json({ error: "Only employers can perform this action" });
}



next()

}
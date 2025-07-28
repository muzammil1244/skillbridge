
import {motion} from "motion/react"
export const Loader = ()=>{
    return(
        <motion.div
         initial={{ backgroundPosition: "0% " }}
      animate={{ backgroundPosition: "100% " }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
      exit={{
        backgroundPosition:"100% 0%"
      }}
       style={{
        backgroundImage: "linear-gradient(white gray gray white)",
        backgroundSize: "600% 600%",
      }}
      className="w-full h-70"
>
<h1>kya hal </h1>
        </motion.div>
    )
}
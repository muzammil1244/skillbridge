import { CreditCardAcceptIcon } from "hugeicons-react"
import {motion} from "motion/react"

export const Nottification = ({title , classname, icon})=>{

    return(
        <motion.div 
       
        className="w-fit h-fit">
<motion.div  
initial={{scale:0}}
        animate={{
            scale:1
        }}

        transition={
            {
                delay:0.5
                
            }
        }

       

     
className={classname}> 
ok you apporaved <CreditCardAcceptIcon/>
</motion.div>

        </motion.div>
    )

}


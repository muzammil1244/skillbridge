import { Navigate } from "react-router-dom"

export const ProtectRout = ({children})=>{

    console.log('hmmmm')
    const token = localStorage.getItem("token")

    if(!token){
        return <Navigate to={"/login"} replace />
    }

    
    return children


}
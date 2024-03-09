import { Auth } from "@/components/Auth";
import { Quote } from "@/components/Quote";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Signin(){
  const navigate = useNavigate(); 
    useEffect(() => {
        // Disable scroll on mount
        document.body.style.overflow = 'hidden';
    
        // Enable scroll on cleanup
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, []);

      useEffect(()=>{
        const token  = localStorage.getItem("token");
        if(token){
          const fetchinfo = async()=>{
            const res = await axios.get(`${BACKEND_URL}/api/v1/user/check`,{
              headers:{
                token
              }
            })
            if(res.data.user){
              
              navigate("/blogs");
            }
          }
          fetchinfo();
        }
      },[])
    return (
        <>
        <div className="flex justify-center items-center h-screen">
            <Auth type="signin"/>
            <div className=" hidden md:block md:w-[50%]">
            <Quote/>
            </div>
        </div>
        </>
    )
}
import { Auth } from "@/components/Auth";
import { Quote } from "@/components/Quote";
import { useEffect } from "react";

export function Signup(){
    useEffect(() => {
        // Disable scroll on mount
        document.body.style.overflow = 'hidden';
    
        // Enable scroll on cleanup
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, []);
    return (
        <>
        <div className="flex justify-center items-center h-screen">
            <Auth type="signup"/>
            <div className=" hidden md:block md:w-[50%]">
            <Quote/>
            </div>
        </div>
        </>
    )
}
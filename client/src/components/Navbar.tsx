import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function Navbar(){
    const navigate = useNavigate();
    return (
        <>
        <div className="font-roboto h-[60px] w-full bg-white border-b-2 flex justify-between items-center sticky top-0 shadow-sm">
            <div className="ml-[50px] text-black text-[30px] font-semibold cursor-pointer" onClick={()=>{
                navigate('/')
            }}>
                <p className="cursor-pointer">Medium</p>
            </div>
            <div className="mr-[60px]">
                <Button variant="link" className="text-black text-sm font-medium">Our Story</Button>
                <Button onClick={()=>{
                    navigate('/signip')
                }} variant="link" className="text-black text-sm font-medium">Signin</Button>
                <Button onClick={()=>{
                    navigate('/')
                }}  variant="link" className="text-black text-sm font-medium">Write</Button>
                <Button variant="link" className="text-black text-sm font-medium">Blogs</Button>
                <Button onClick={()=>{
                    navigate('/signup')
                }} className="rounded-full hover:bg-white border-2 border-black  hover:text-black hover:border-black hover:border-2 hover:shadow-xl">Get Started</Button>
            </div>
        </div>
        </>
    )
}
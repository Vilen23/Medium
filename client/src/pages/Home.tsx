import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
export function Home(){
    return (
        <>
        <div className="w-full h-screen flex items-center flex-col font-poppins">
            <div className="mt-[150px] flex flex-col items-center">
                <p className="text-[40px] font-bold">Experience the workflow the best frontend teams love.</p>
                <p className="text-xl w-[900px] text-center text-slate-600">Let your team focus on shipping features instead of managing infrastructure with automated CI/CD.</p>
            </div>
            <div className="flex mt-[50px] gap-[10px] items-center" >
                <Input placeholder="Enter your email" className="rounded-lg h-[45px]"/>
                <Button className="rounded-md">Sign Up</Button>
            </div>
            <div className="flex items-center mt-[4px] gap-1">
                <p className="text-[12px] text-gray-700">Sign up to get notified when we launch. </p> 
                <p className="text-[12px] text-gray-700 underline hover:text-black cursor-pointer"> Terms & Conditions</p>
            </div>
        </div>
        </>
    )
}
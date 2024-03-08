import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChangeEvent, useState } from "react";
import { SignupInput } from "@vilen23/medium-zod";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Auth({type}:{type:"signup" | "signin"}){
    const navigate = useNavigate();
    const [loader,setLoader] = useState(false);
    const [postInput,setpostInput] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    console.log(postInput);
    
    async function HandleSignup(){
        setLoader(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInput);
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            setLoader(false);
            navigate("/blogs")
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }
    async function HandleSignin(){
        setLoader(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInput);
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            setLoader(false);
            navigate("/blogs")
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }

    return (
        
        <div className="p-[20px] w-[80%] md:w-[50%] flex justify-center items-center flex-col font-roboto">
            <div className="text-[35px] font-extrabold">
                {type==="signup"?"Create an Account":"Login to your account"}
            </div>
            <div className="flex text-slate-600 mt-[-10px] items-center">
                <p>{type==="signup"?"Already have an account?":"Dont have an account?"}</p>
                <Button onClick={()=>{
                    navigate(type==="signup"?"/signin":"/signup")
                }} variant="link" className="text-slate-800 pl-[2px] text-[16px]">{type==="signin"?"Sign up":"Login"}</Button>
            </div>
            <div className="flex flex-col items-center gap-[20px] mt-2">
                {type==="signup" && <LabelledInput label="Name" placeholder="Enter your name" type="text" onChange={(e)=>{
                    setpostInput(c=>({...c,name:e.target.value}))
                }} />}
                <LabelledInput label="Email" placeholder="Enter your email" type="email" onChange={(e)=>{
                    setpostInput(c=>({...c,email:e.target.value}))
                }} />
                <LabelledInput label="Password" placeholder="Enter your password" type="password" onChange={(e)=>{
                    setpostInput(c=>({...c,password:e.target.value}))
                }} />
                <Button onClick={type==="signin"?HandleSignin:HandleSignup} className="rounded-md w-[360px] hover:bg-white border-2 border-black  hover:text-black hover:border-black hover:border-2 hover:shadow-sm ">{type==="signin"?"Sign in":"Sign up"}</Button>
            </div>
        </div>
        
    )
}

function LabelledInput({label,placeholder,type,onChange}:{label:string,placeholder:string,type?:string,onChange:(e:ChangeEvent<HTMLInputElement>)=>void}){
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-[15px] font-semibold font-roboto" htmlFor={label}>{label}</Label>
            <Input onChange={onChange} className="focus:outline-none" type={type||"text"} id={label} placeholder={placeholder} />
        </div>
    )
}
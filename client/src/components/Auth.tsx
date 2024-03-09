import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChangeEvent, useState } from "react";
import { SignupInput } from "@vilen23/medium-zod";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/State/Post/user/user";
import { Spinner } from "@/pages/CreateBlog";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>"jjjjjjjjjjj"</AlertDescription>
    </Alert>
  );
}

export function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [postInput, setpostInput] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function HandleSignup() {
    setLoader(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInput
      );
      console.log(response);
      setUser(response.data.user);
      setLoader(false);
      setUser({
        id:"",
        name:"",
        email:"",
      })  
      setTimeout(()=>{
        navigate("/signin");
      
      },1000)
    } catch (error) {
        //@ts-ignore
        setError((error.response.data.message));
        setLoader(false);
    }
  }
  async function HandleSignin() {
    setLoader(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInput
      );
      if (response.status === 200) {
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        setUser(response.data.user);
        setLoader(false);
        navigate("/blogs");
      } else {
        setError(response.data.message);
        setLoader(false);
        console.log("invalid");
      }
    } catch (error) {
      //@ts-ignore
      setError(error.response.data.message);
      setLoader(false);
      console.log("invalid");
      setLoader(false);
    }
  }

  return (
    <div className="p-[20px] w-[80%] md:w-[50%] flex justify-center items-center flex-col font-roboto">
      {error && (
        <div className="w-[360px] mb-5">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      <div className="text-[35px] font-extrabold">
        {type === "signup" ? "Create an Account" : "Login to your account"}
      </div>
      <div className="flex text-slate-600 mt-[-10px] items-center">
        <p>
          {type === "signup"
            ? "Already have an account?"
            : "Dont have an account?"}
        </p>
        <Button
          onClick={() => {
            navigate(type === "signup" ? "/signin" : "/signup");
          }}
          variant="link"
          className="text-slate-800 pl-[2px] text-[16px]"
        >
          {type === "signin" ? "Sign up" : "Login"}
        </Button>
      </div>
      <div className="flex flex-col items-center gap-[20px] mt-2">
        {type === "signup" && (
          <LabelledInput
            label="Name"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => {
              setpostInput((c) => ({ ...c, name: e.target.value }));
            }}
          />
        )}
        <LabelledInput
        onClick={()=>{
            setError("");
         }}
          label="Email"
          placeholder="Enter your email"
          type="email"
          onChange={(e) => {
            setpostInput((c) => ({ ...c, email: e.target.value }));
          }}
        />
        <LabelledInput
        onClick={()=>{
            setError("");
         }}
          label="Password"
          placeholder="Enter your password"
          type="password"
          onChange={(e) => {
            setpostInput((c) => ({ ...c, password: e.target.value }));
          }}
        />
        <Button
          onClick={type === "signin" ? HandleSignin : HandleSignup}
          className="rounded-md w-[360px] hover:bg-white border-2 border-black  hover:text-black hover:border-black hover:border-2 hover:shadow-sm "
        >
          {type === "signin" ? (
            loader ? (
              <Spinner />
            ) : (
              "Sign in"
            )
          ) : loader ? (
            <Spinner />
          ) : (
            "Sign up"
          )}
        </Button>
      </div>
    </div>
  );
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
  onClick
}: {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="text-[15px] font-semibold font-roboto" htmlFor={label}>
        {label}
      </Label>
      <Input
        onChange={onChange}
        className="focus:outline-none"
        type={type || "text"}
        id={label}
        placeholder={placeholder}
        onClick={onClick}
      />
    </div>
  );
}

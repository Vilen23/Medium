import { userAtom } from "@/State/Post/user/user";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { SignoutButton } from "./SignoutButton";
import { AlertWrite } from "./AlertWritePage";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userAtom);
    const [showSignOut, setShowSignOut] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Add type assertion
    const path = window.location.pathname;
    

  return (
    <>
      <div className=" z-50 font-roboto h-[60px] w-full bg-white border-b-2 flex justify-between items-center sticky top-0 shadow-sm">
        <div
          className="ml-[50px] text-black text-[30px] font-semibold cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <p className="cursor-pointer">Medium</p>
        </div>
        <div className="mr-[60px] flex">
          <Button variant="link" className="text-black text-sm font-medium">
            Our Story
          </Button>
          {!user.id && path!=="/signin" && (
            <Button
              onClick={() => {
                navigate("/signin");
              }}
              variant="link"
              className="text-black text-sm font-medium"
            >
              Signin
            </Button>
          )}
          {user.id && <Button
            onClick={() => {
              navigate("/write");
            }}
            variant="link"
            className="text-black text-sm font-medium"
          >
            Write
          </Button>}
          {!user.id && <AlertWrite/>}
          <Button
            onClick={() => {
              navigate("/blogs");
            }}
            variant="link"
            className="text-black text-sm font-medium"
          >
            Blogs
          </Button>
          {!user.id && path!=="/signup" && (
            <Button
              onClick={() => {
                navigate("/signup");
              }}
              className="rounded-full hover:bg-white border-2 border-black  hover:text-black hover:border-black hover:border-2 hover:shadow-xl"
            >
              Get Started
            </Button>
          )}
          {user.id && (
        <div className="relative" ref={dropdownRef}>
          <Avatar
            className="cursor-pointer"
            onMouseEnter={() => setShowSignOut(!showSignOut)}
            
          >
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          {showSignOut && (
            <div className="absolute top-full right-0 mt-2 w-[90px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 flex justify-center">
              <SignoutButton />
            </div>
          )}
        </div>
      )}
        </div>
      </div>
    </>
  );
}

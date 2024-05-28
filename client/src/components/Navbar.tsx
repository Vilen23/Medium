import { userAtom } from "@/State/Post/user/user";
import { Button } from "@/components/ui/button";
import {  useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { SignoutButton } from "./SignoutButton";
import { AlertWrite } from "./AlertWritePage";
import { useRef, useState } from "react";

export function Navbar() {
    const navigate = useNavigate();
    const user = useRecoilValue(userAtom);
    const [showSignOut, setShowSignOut] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const path = window.location.pathname;
    
    const handleOurStoryClick = () => {
      navigate('/#ourStory');
    };
  return (
    <>
      <div className="z-50 font-roboto h-[60px] w-full bg-white border-b-2 flex justify-between items-center sticky top-0 shadow-sm">
        <div
          className="md:ml-[50px] ml-[10px] text-black md:text-[30px] text-[20px] font-semibold cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <p className="cursor-pointer">Medium</p>
        </div>
        <div className="md:mr-[60px] flex">
          <Button variant="link" className="text-black hidden md:flex text-xs md:text-sm font-medium">
          <a onClick={handleOurStoryClick}>Our Story</a>
          </Button>
          {path!=="/signin" && !user.id   && (
            <Button
              onClick={() => {
                navigate("/signin");
              }}
              variant="link"
              className="text-black text-xs md:text-sm font-medium"
            >
              Signin
            </Button>
          )}
          {user.id && <Button
            onClick={() => {
              navigate("/write");
            }}
            variant="link"
            className="text-black text-xs md:text-sm font-medium"
          >
            Write
          </Button>}
          {!user.id && <AlertWrite/>}
          <Button
            onClick={() => {
              navigate("/blogs");
            }}
            variant="link"
            className="text-black text-xs md:text-sm font-medium"
          >
            Blogs
          </Button>
          {!user.id && path!=="/signup" && (
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="rounded-full px-2 bg-black text-white transition-all duration-600 md:font-semibold text-xs md:text-sm hover:bg-white border-2 py-0 border-black  hover:text-black hover:border-black hover:border-2 hover:shadow-xl hidden md:flex items-center"
            >
              Get Started
            </button>
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

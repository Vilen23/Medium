import { userAtom } from "@/State/Post/user/user";
import { BlogHomeCard } from "@/components/BlogHomeCard";
import { LoadingBlog } from "@/components/LoadingBLog";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export function Home() {
  const user = useRecoilValue(userAtom);
  const divRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (divRef.current) {
        //@ts-ignore
        const divStart = divRef.current.offsetTop;
        //@ts-ignore
      const divEnd = divStart + divRef.current.offsetHeight;
  
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (currentScrollPos < divStart) {
          setOpacity(1);
        } else if (currentScrollPos > divEnd) {
          setOpacity(0);
        } else {
          setOpacity(1 - (currentScrollPos - divStart) / (divEnd - divStart));
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setBlogs(res.data.blogs.slice(0, 6));
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  console.log(blogs);

  return (
    <>
      <div className="w-full  flex items-center flex-col font-poppins justify-center pb-10" >
        <div className="w-full flex flex-col items-center md:min-h-screen" ref={divRef} style={{opacity: opacity}}>
        <div className="mt-[80px] px-1 md:px-0 md:mt-[200px] flex flex-col items-center justify-center min">
          <p className="text-[30px]  md:text-[40px] font-bold text-center ">
            A Community Space for Shared Reflections and Thoughts
          </p>
          <p className="text-[14px] px-1 md:px-0 md:text-xl md:w-[700px] text-center text-slate-600">
            "Voices of the Valley" - Where your thoughts find their echo. A
            tapestry of insights woven from the voices of many, awaiting your
            unique thread.
          </p>
        </div>
        {!user.id ? (
          <div className="flex mt-[50px] gap-[10px] items-center">
            <p className=" text-gray-600  md:text-[20px]">Sign up to Start writing</p>
            <Button className="rounded-md border-black border-2 hover:bg-white hover:text-black" onClick={() => {
                navigate("/signup");
            }}>
              Sign Up
            </Button>
          </div>
        ) : (
          <div className="mt-[20px]">
            <span>Welcome </span>
            <span className="font-bold text-2xl">{user.name}</span>{" "}
            <span>to our platform</span>
          </div>
        )}
        {!user.id && (
          <div className="flex items-center flex-col mt-[4px] gap-1">
            <p className="text-[12px] md:text-[12px] text-gray-700">
              Sign up to get notified when we launch.{" "}
            </p>
            <p className="text-[12px] text-gray-700 underline hover:text-black cursor-pointer">
              {" "}
              Terms & Conditions
            </p>
          </div>
        )}
        </div>
        <div className="md:mt-0 mt-[50px] flex flex-col items-center min-h-screen">
          <div className=" flex flex-col justify-center items-center gap-2">
            <p className="font-bold text-3xl md:text-5xl">Latest Posts</p>
            <p className="text-gray-500 text-center text-[16px] px-1 md:px-0">
              The most recent articles from our amazing contributors.
            </p>
          </div>
          <div className="grid grid-cols-1 px-[2vw] md:px-0 md:grid-cols-3 gap-10 my-10">
            { loading? (
                <div className="flex md:flex-row flex-col items-center gap-20 w-screen justify-center">
                <LoadingBlog />
                <LoadingBlog />
                <LoadingBlog />
                </div>
            ):blogs.map((blog: any) => {
              return (
                <BlogHomeCard
                  id={blog.id}
                  key={blog.id}
                  authorName={blog.authorName}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={blog.createdAt}
                  imagelink={blog.imagelink}
                />
              );
            })}
          </div>
        </div>
        <div id="ourStory" className="my-[50px] w-full flex  md:h-[500px] md:p-[40px]">
          <div className="flex flex-col md:flex-row rounded-2xl  items-center justify-center">
            <div className="w-[90vw] md:w-[45%] bg-black md:h-[200px] flex flex-col items-center rounded-full  md:ml-10 justify-center py-4 md:py-0">
              <p className="text-white font-extrabold text-3xl md:text-5xl ">
                "Echoes in the Ether"
              </p>
              <p className="text-white text-[14px] px-2 md:text-[20px] md:mt-2">
                A Blogging Platform for Shared Stories and Thoughts
              </p>
            </div>
            <div className="h-full mt-4 md:w-[55%]  flex justify-center md:px-20 px-[4vw] items-center">
              <p className="md:font-bold text-center md:text-justify text-[16px] md:text-[20px]">
                "Echoes in the Ether" is more than a blogging platform; it's a
                digital sanctuary where stories intertwine, and thoughts
                reverberate. Here, every post is a chapter, every comment a
                conversation, creating a tapestry of shared experiences. Join us
                to share your story, connect with others, and let your voice
                resonate in the vast expanse of the digital world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

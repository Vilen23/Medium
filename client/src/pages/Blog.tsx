import { LoadingBlog } from "@/components/LoadingBLog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export function Blog() {
  const path = window.location.pathname;
  const id = path.split("/")[2].replace(":", "");
  const [loader, setLoader] = useState(true);
  const [blog, setBlog] = useState<any>({});

  useEffect(() => {
    setLoader(true);
    try {
      const fetchpost = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`);
        console.log(response.data.blog);
        setBlog(response.data.blog);
        setLoader(false);
      };
      fetchpost();
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }, []);
  return (
    loader ? <div className="w-full flex justify-center mt-[100px]">
        <LoadingBlog/>
    </div>:<div className="flex flex-col items-center md:w-full font-roboto">
    <div className="md:w-[600px] mt-10 flex flex-col mb-[30px] justify-center items-center">
      <h1 className="text-4xl font-extrabold text-center mb-4">{blog.title}</h1>
      <div className="flex gap-4 items-center">
        <Avatar className="h-[50px] w-[50px]">
          <AvatarFallback className="font-bold text-xl">
            {blog.authorName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-xl">{blog.authorName}</p>
          <p className="text-gray-600 text-xs font-semibold ">
            {new Date(blog.createdAt).toLocaleDateString()} . {Math.ceil(blog.content.length / 100)} minutes to read
          </p>
        </div>
      </div>
    </div>
    <img src={blog.imagelink} className="mt-5 w-[90vw] border-2 border-black md:w-[1400px] " />
    <div className="md:w-[700px] md:mb-[500px] md:mt-20 w-[92vw]">
      <div
        className="md:text-xl  mt-5 font-poppins text-justify font-light"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  </div>
  );}
  ;


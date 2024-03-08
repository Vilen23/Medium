import { blogsAtom } from "@/State/Post/blog/blog";
import { BlogCard } from "@/components/BlogCard";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export function Blogs(){
    const [blogs,setBlogs] = useRecoilState(blogsAtom);

    useEffect(() => {
        const fetchBlogs = async () => {
            try{
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                    headers:{
                        token:localStorage.getItem("token")
                    }
                });
                setBlogs(res.data.blogs);
            }catch(e){
                console.log(e);

            }
        }
        fetchBlogs();
    },[])


    return (
        <div className="flex flex-col gap-5">
        {blogs?.map((blog:any)=>{
            return <BlogCard id={blog.id} key={blog.id} authorName={blog.authorName} title={blog.title} content={blog.content} publishedDate={blog.createdAt} imagelink={blog.imagelink}/>
        })}
    </div>
    )
}
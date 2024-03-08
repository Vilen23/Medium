import { BlogCard } from "@/components/BlogCard";

export function Blogs(){
    return (
        <div className="flex flex-col gap-5">
            <BlogCard authorName="John Doe" title="My first blog" content="This is my first blog. I am so excited to write this blog. I hope you like it.This is my first blog. I am so excited to write this blog. I hope you like it.This is my first blog. I am so excited to write this blog. I hope you like it." publishedDate="2021-09-01"/>

        </div>
    )
}
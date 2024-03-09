import { useNavigate } from "react-router-dom";
import { BlogCardProps } from "./BlogCard";

export function BlogHomeCard(prop:BlogCardProps){
    const navigate = useNavigate();
    return(
        <div onClick={()=>{
            navigate(`/blog/:${prop.id}`);
        }} className="flex">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl cursor-pointer hover:bg-gray-100 transform hover:scale-105 transition-transform duration-500">
                <div className="relative">
                    <img
                      alt="Blog Image"
                      className="object-cover w-full h-48 transition-all duration-200 "
                      height={250}
                      src={prop.imagelink}
                      style={{
                        aspectRatio: "400/250",
                        objectFit: "cover",
                      }}
                      width={400}
                    />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700">{prop.authorName}</p>
                  <h3 className="text-lg font-semibold w-[307px] line-clamp-2 hover:text-gray-800">{prop.title}</h3>

                </div>
              </div>
        </div>
    )
}
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  imagelink?: string;
  id: string;
}

function stripHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function BlogCard(prop: BlogCardProps) {
  const contentText = stripHtml(prop.content);
  const publishedDate = new Date(prop.publishedDate).toLocaleDateString();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-center border-b-2 pb-4 px-4 gap-4  items-center font-roboto mx-auto min-h-[240px] md:w-[800px]">
      <div className="flex flex-col md:w-[500px]">
        <div className="flex flex-col mt-[20px]">
          <div className="flex items-end ">
            <Avatar className="h-[30px] w-[30px]">
              <AvatarFallback className="font-bold text-lg">
                {prop.authorName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <p className="font-bold md:text-[18px] ml-2">{prop.authorName}</p>
              <p className="text-gray-600 text-[10px] md:text-xs font-semibold ">
                {publishedDate}
              </p>
            </div>
          </div>

          <div className="font-extrabold text-4xl mt-2 line-clamp-2">{prop.title}</div>
          <div className="text-gray-800 text-[13px] md:text-lg mt-1 line-clamp-2">
            {contentText}
          </div>
          <Badge
            className="self-start w-auto h-[15px] md:h-[17px] text-[10px] md:text-xs text-gray-800"
            variant="outline"
          >
            {`${Math.ceil(prop.content.length / 100)} minutes to read`}
          </Badge>
        </div>
      </div>
      <div className="">
        <img
          src={prop.imagelink}
          alt="blog"
          className="cursor-pointer w-[250px] border-black border-2 h-[150px] object-cover rounded-md transform transition-all duration-500 hover:scale-90 shadow-lg "
          onClick={() => {
            navigate(`/blog/:${prop.id}`);
          }}
        />
      </div>
    </div>
  );
}

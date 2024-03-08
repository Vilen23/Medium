import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "@/components/ui/badge"


interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export function BlogCard(prop: BlogCardProps) {
  return (
    <div className="flex flex-col justify-center border-b-2 pb-4 px-4  items-center font-roboto mx-auto w-[500px]">
      <div className="flex flex-col mt-[20px]">
      <div className="flex items-end ">
        <Avatar className="h-[30px] w-[30px]">
          <AvatarFallback className="font-bold text-md">{prop.authorName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
            <p className="font-bold text-[18px] ml-2">{prop.authorName}</p> 
            <p className="text-gray-600 text-xs font-semibold ">{prop.publishedDate}</p>
        </div>
      </div>

      <div className="font-extrabold text-4xl mt-2">{prop.title}</div>
      <div className="text-gray-800 text-md mt-1">{prop.content.slice(0, 100) + "..."}</div>
      <Badge className="w-[120px] h-[17px] text-xs text-gray-800" variant="outline">{`${Math.ceil(prop.content.length / 100)} minutes to read`}</Badge>
      </div>

    </div>
  );
}

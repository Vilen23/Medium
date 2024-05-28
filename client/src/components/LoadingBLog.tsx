import { Skeleton } from "@/components/ui/skeleton"

export function LoadingBlog() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-400" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-400" />
        <Skeleton className="h-4 w-[200px] bg-gray-400" />
      </div>
    </div>
  )
}
export function LoadingBlogCard() {
    return (
        <div className="flex gap-10 flex-col md:flex-row">
        <div className="flex flex-col gap-5">
        <Skeleton className="h-[30px] w-[80vw] md:w-[160px] rounded-xl bg-gray-300" />
        <Skeleton className="h-[80px] w-[80vw] md:w-[500px] rounded-xl bg-gray-300" />
        <Skeleton className="h-[48px] w-[80vw] md:w-[500px] rounded-xl bg-gray-300" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-[150px] w-[80vw] md:w-[250px] bg-gray-300" />
        </div>
        </div>
    )
}

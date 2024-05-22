import { Skeleton } from "@/components/ui/skeleton";

export const PostStatsSkeleton = () => {
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 ">   
        <div className="flex gap-2 mr-5">
          <Skeleton className="w-5 h-5" />
        </div>  
        <div className="flex gap-2 mr-5">
          <Skeleton className="w-5 h-5" />
        </div>
      </div>

      <div className="flex gap-2 ">
        <Skeleton className="w-5 h-5" />
      </div>
    </div>
  );
}
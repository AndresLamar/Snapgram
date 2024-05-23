import { Skeleton } from "@/components/ui/skeleton";
import { PostStatsSkeleton } from "./PostStatsSkeleton";

const HomeSkeleton = () => {
  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>

          <Skeleton className='rounded-full w-12 lg:h-12 object-cover' />

          <div className='flex flex-col'>

            <Skeleton className='h-5 w-20 mb-2' />

            <div className='flex-center gap-2 text-light-3'>
              <Skeleton className='h-5 w-12' />
              <Skeleton className='h-5 w-12' />
            </div>
          </div>
        </div>
      </div>

      <div className='small-medium lg:base-medium py-5'>
        <Skeleton className='mb-2 h-5 w-full' />
        <Skeleton className='mb-2 h-5 w-1/2' />
        <ul className='flex gap-1 mt-2'>
          {Array.from(Array(3).keys()).map((tag) => (
            <Skeleton key={tag} className='h-5 w-10' />
          ))}
        </ul>
      </div>

      <Skeleton className='post-card_img' />
      <PostStatsSkeleton />
    </div>

  );
};

export default HomeSkeleton;

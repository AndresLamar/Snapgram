import { Skeleton } from "../ui/skeleton"
import CommentsSkeleton from "./CommentsSkeleton"
import { PostStatsSkeleton } from "./PostStatsSkeleton"

function PostDetailsSkeleton() {
  return (
    <div className='post_details-card'>
        <Skeleton className="h-80 lg:h-[505px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover"/>
        <div className= 'post_details-info'>
            <div className="flex flex-col gap-5 w-full">
              <div className='flex-between w-full'>

                <div className="flex items-center gap-3">
                    <Skeleton className='rounded-full w-8 h-8 lg:w-12 lg:h-12'/>
                    
                  <div className='flex flex-col'>
                    <Skeleton className='h-5 w-20 mb-2' />

                      <div className='flex-center gap-2 text-light-3'>
                        <Skeleton className='h-5 w-12' />
                        <Skeleton className='h-5 w-12' />
                      </div>
                  </div>
                </div>

             </div>
                
              <div className='flex flex-col flex-1 w-full gap-2 small-medium lg:base-semibold'>
                <Skeleton className='mb-2 h-5 w-full' />
                
                <ul className='flex gap-1 mt-2'>
                    {Array.from(Array(3).keys()).map((tag) => (
                        <Skeleton key={tag} className='h-5 w-10' />
                    ))}
                </ul>
              </div>

              <hr className="border w-full border-dark-4/80"/>

            </div>
            
            <div className='w-full h-44 max-h-44 overflow-scroll custom-scrollbar'>
                <CommentsSkeleton />
            </div>


            <div className="w-full">
                <PostStatsSkeleton />
            </div>
            
            <div className='flex w-full gap-3'>
                <Skeleton className='w-9 h-9 rounded-full'/>
              <div className='flex flex-between w-full rounded-lg bg-dark-3'>
                <Skeleton className='h-11  '/>
                  
              </div>
            </div>
              
            </div>          
        </div>
  )
}

export default PostDetailsSkeleton
import { Skeleton } from "../ui/skeleton";

function CommentsSkeleton() {
  return (
    <div className='flex flex-col gap-8'>
        {Array.from(Array(3).keys()).map((key) => (
          <div key={`comment-key-${key}`} className="flex items-center gap-3" > 
              <Skeleton className='w-9 h-9 rounded-full' />

              <div className='flex flex-col'>
                  <div className='flex flex-row max-w-[340px]'>
                      <Skeleton className='w-14 h-5 mr-3' />
                      <Skeleton className='w-11 h-5' />
                  </div>
                  <Skeleton className='w-9 h-4 mt-2' />
              </div>    
          </div>
          ))}
    </div>
  )
}

export default CommentsSkeleton
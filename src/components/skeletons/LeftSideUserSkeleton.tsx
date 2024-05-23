import { Skeleton } from "../ui/skeleton"

function LeftSideUserSkeleton() {
  return (
    <div className='flex gap-3 mt-8 items-center'>
        <Skeleton className='h-14 w-14 rounded-full object-cover' />
        <div className='flex flex-col gap-1'>
            <Skeleton className='w-32 h-4' />
            <Skeleton className='w-24 h-4' />
        </div>
    </div>
  )
}

export default LeftSideUserSkeleton
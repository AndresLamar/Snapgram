import { Skeleton } from "../ui/skeleton"

type UserCardSkeletonProps = {
    size?: 'small' | 'large'; // Prop opcional para determinar el tamaño de la tarjeta
  }

function UserCardSkeleton({size = 'small'}: UserCardSkeletonProps) {
  return (
    <>    
        {Array.from(Array(6).keys()).map((key) => (
            <li key={`user-skeleton-key-${key}`} className={`flex flex-center flex-col ${size === 'large' ? 'py-10 px-16' : 'py-4 px-6'} rounded-3xl border border-dark-4`}>
                <div className="flex flex-center flex-col">
                    <Skeleton className={`rounded-full ${size === 'large' ? 'w-20 h-20' : 'w-11 h-11'} mb-3`}/>
                    <Skeleton className="h-5 w-20 mb-2"/>
                    <Skeleton className="h-5 w-20 mb-2"/>
                </div>
                <Skeleton className="mt-3 h-10 w-full"/>
            </li>
        ))}
    </>
  )
}

export default UserCardSkeleton
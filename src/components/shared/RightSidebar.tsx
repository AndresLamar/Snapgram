import { useGetUsers } from "@/lib/react-query/queriesAndMutations"
// import Loader from "./Loader"
import UserCard from "./UserCard"
import UserCardSkeleton from "../skeletons/UserCardSkeleton"


function RightSidebar() {
  const { data: users, isPending: isUsersLoading} = useGetUsers(6)

  return (
    <div className='rightsidebar '> 
        <h3 className='h3-bold text-left w-full'>Top Creators</h3>
        <ul className='grid gap-6 grid-cols-2 mt-10'>
          {isUsersLoading ? (
            <UserCardSkeleton />
          ) : (
            <>
              {users?.pages.map((item, index) => (
                <UserCard users={item} key={`page-${index}`} />
              ))}
            </>
          )}
          {/* {!users && <Loader />} */}
          
        </ul>    
    </div>
  )
}

export default RightSidebar

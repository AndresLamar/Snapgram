import { useGetUsers } from "@/lib/react-query/queriesAndMutations"
import Loader from "./Loader"
import UserCard from "./UserCard"


function RightSidebar() {
  const { data: users} = useGetUsers(6)

  return (
    <div className='rightsidebar '> 
        <h3 className='h3-bold text-left w-full'>Top Creators</h3>
        <ul className='grid gap-6 grid-cols-2 mt-10'>
          {!users && <Loader />}
          {users?.pages.map((item, index) => (
            <UserCard users={item} key={`page-${index}`} />
          ))}
        </ul>    
    </div>
  )
}

export default RightSidebar

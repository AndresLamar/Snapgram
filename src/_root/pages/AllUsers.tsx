import Loader from "@/components/shared/Loader"
import UserCard from "@/components/shared/UserCard"
import { useGetUsers } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function AllUsers() {
  const { data: users, fetchNextPage, hasNextPage} = useGetUsers(9)
  const { ref, inView} = useInView()

  useEffect(() => {
    if(inView  && hasNextPage) fetchNextPage()
  },[inView, fetchNextPage, hasNextPage])

  return (
    <div className='user-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img 
            src="/assets/icons/people.svg" alt="add"
            width={36}
            height={36}
            className="invert-white"
            />
            <h2 className='h3-bold md:h2-bold text-left w-full'>All Users</h2>
        </div>
        {!users && <Loader />}

        <ul className='user-grid'>
          {users?.pages.map((item, index) => (
            <UserCard users={item} key={`page-${index}`} size = 'large'/>
          ))}
        </ul> 

        {hasNextPage && (
        <div ref={ref} className='mt10'>
          <Loader />
        </div>
      )}
      </div>
  )
}

export default AllUsers

import Loader from "@/components/shared/Loader"
import PostCard from "@/components/shared/PostCard";
import PostDetailsModal from "@/components/shared/PostDetailsModal";
import RightSidebar from "@/components/shared/RightSidebar"
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";

import { useGetPosts } from '@/lib/react-query/queriesAndMutations'
import { IPostProps } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";


function Home() {
  const [selectedPost, setSelectedPost] = useState<IPostProps | null>(null);

  const handlePostClick = (post: IPostProps) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const { ref, inView} = useInView({
    /* Optional options */
    rootMargin: '500px 500px',
    threshold: 0.1,
  })


  const user_id = localStorage.getItem('userId') ?? ''

  const { data: posts, fetchNextPage, hasNextPage, isPending: isPostLoading } = useGetPosts(3, user_id)

  useEffect(() => {
    if(inView  && hasNextPage) fetchNextPage()
  },[inView, fetchNextPage, hasNextPage,])


  return (
    <div className='flex flex-1 '>
      <div className="home-container">
        <div className='max-w-5xl flex-start gap-3 justify-start w-full ml-4'>
            <img 
              src="/assets/icons/home.svg" alt="home"
              width={36}
              height={36}
              className="invert-white"
              />
            <h2 className='h3-bold md:h2-bold text-left w-full '>Home Feed</h2>
          </div>
        <div className="home-posts">
          <ul className='flex flex-col flex-1 gap-9 w-full'> 
            {isPostLoading  ? (
              <HomeSkeleton />
             ): (
              <>
                {posts?.pages.map(posts => (
                  posts.map((post: IPostProps) => (
                    <PostCard post={post} key={post.caption} handlePostClick={handlePostClick}/>
                  ))
                ))}
              </>
            )} 
            
          </ul>

          {selectedPost && <PostDetailsModal post={selectedPost} closeModal={closeModal} />}


          {hasNextPage  && (
            <div ref={ref} className='mt10'>
              <Loader />
            </div>
          )}
        </div>
      </div>
      <RightSidebar />


    </div>
  )
}

export default Home
             
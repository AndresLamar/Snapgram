import { useUserContext } from '@/context/AuthContext'
import { useGetSavedPostsForUser } from '@/lib/react-query/queriesAndMutations'
import Loader from '@/components/shared/Loader'
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from 'react';
import GridPostList from './GridPostList';
import { IPostProps } from '@/types';
import PostDetailsModal from '@/components/shared/PostDetailsModal';
import SavedSkeleton from '@/components/skeletons/SavedSkeleton';

function Saved() {
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

  const { user } = useUserContext()

  const { data: posts, fetchNextPage, hasNextPage, isPending: isPostLoading} = useGetSavedPostsForUser(6, user.id)

  useEffect(() => {
    if(inView && hasNextPage) fetchNextPage()
  },[inView, fetchNextPage, hasNextPage])


  return (
    <div className="saved-container">
      <div className='max-w-5xl flex-start gap-3 justify-start w-full ml-8'>
        <img 
          src="/assets/icons/save.svg" alt="add"
          width={36}
          height={36}
          className="invert-white"
          />
          <h2 className='h3-bold md:h2-bold text-left w-full '>Saved Posts</h2>
      </div>

        {isPostLoading ? (
          <SavedSkeleton />
        ) : (
          <> 
            {posts?.pages?.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item} showUser={false} showStats={false} handlePostClick={handlePostClick}/>
            ))}
          </>
        )} 

        {selectedPost && <PostDetailsModal post={selectedPost} closeModal={closeModal} />}


        {hasNextPage && (
        <div ref={ref} className='mt10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Saved
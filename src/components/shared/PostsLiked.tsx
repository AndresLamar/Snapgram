import Loader from '@/components/shared/Loader'
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from 'react';
import { useGetPostsLikedForUser } from '@/lib/react-query/queriesAndMutations';
import GridPostList from '@/_root/pages/GridPostList';
import { IPostProps } from '@/types';
import PostDetailsModal from './PostDetailsModal';
import { GridPostsSkeleton } from '../skeletons/GridPostsSkeleton';


function PostsLiked({user_id}: {user_id: string}) {
  const { ref, inView} = useInView({
    /* Optional options */
    rootMargin: '500px 500px',
    threshold: 0.1,
    })

  const { data: posts, fetchNextPage, hasNextPage, isPending: isUserLikedPostsPending} = useGetPostsLikedForUser(6, user_id ?? '')

  const [selectedPost, setSelectedPost] = useState<IPostProps | null>(null);

  const handlePostClick = (post: IPostProps) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    if(inView && hasNextPage) fetchNextPage()
  },[inView, fetchNextPage, hasNextPage])
    
    
  return (
    <div>
        {isUserLikedPostsPending ? <GridPostsSkeleton showUser={false} showStats={false} /> : (
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

export default PostsLiked
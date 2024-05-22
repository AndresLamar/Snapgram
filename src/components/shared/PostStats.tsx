import { useGetStatsForPost, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations"
import { IPostProps } from "@/types"
import useShallowNavigation from "@/hooks/useNavigateShallowTo"
import { PostStatsSkeleton } from "../skeletons/PostStatsSkeleton"

type PostStatsProps = {
    post: IPostProps
    userId: string
    handlePostClick?: (post: IPostProps) => void
}

function PostStats({ post, userId, handlePostClick }: PostStatsProps) {

    const navigateShallowTo = useShallowNavigation()

    const handleClick = (post:IPostProps, event: React.MouseEvent<HTMLElement>) => {
        if(handlePostClick){
            handlePostClick(post)
        }
        const { id } = event.currentTarget.dataset || {}; // Get post ID from data attribute
        if (id) {
        navigateShallowTo(`/posts/${id}`); // Update URL with post ID
        }
    };

    const { mutate: likePost, isPending: isLiking } = useLikePost()
    const { mutate: savePost, isPending: isSavingPost } = useSavePost()

    const { data: stats , isPending: isLoadingStats} = useGetStatsForPost(post.id, userId)

    const handleLikePost = (e: React.MouseEvent ) => {
        e.stopPropagation()
        if (!isLiking) { 
            const isLikedByUser = stats.has_liked === true

            const isLike = !isLikedByUser;  // Verifica si el usuario aún no ha dado like
            likePost({ postId: post.id, userId, isLike }) // Envía el parámetro isLike a la función likePost
        }
    }

    const handleSavePost = (e: React.MouseEvent ) => {
        e.stopPropagation()

        if (!isSavingPost) { 
            const isSavedByUser = stats.has_saved === true

            const isSave = !isSavedByUser;  
            savePost({ postId: post.id, userId, isSave }); 
        }
    }


  return (
    <div className="flex justify-between items-center z-20">
        {isLoadingStats ? <PostStatsSkeleton /> : (
        <>
            <div className="flex gap-2 ">     
                <div className="flex gap-2 mr-5">
                    <img 
                    src={stats.has_liked === true ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"} 
                    alt={stats.has_liked === true ? 'liked' : 'like'}
                    width={20}
                    height={20} 
                    onClick={handleLikePost}
                    className={`cursor-pointer ${isLiking ? 'pointer-events-none' : ''}`}
                    />
                    <p className="small-medium lg:base-medium">{stats.likes_count}</p>
                </div>

                <div className="flex gap-2 mr-5">

                    <img 
                        src="/assets/icons/chat.svg" 
                        alt="comment" 
                        width={22}
                        height={22}
                        className='cursor-pointer'
                        onClick={(event) => handleClick(post, event)} 
                        data-id={`${post.id}`}
                    />
                    <p className="small-medium lg:base-medium">{stats.comment_count}</p>
                    
                </div>
            </div>

            <div className="flex gap-2 ">
                <img
                    src={stats.has_saved === true ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                    alt={stats.has_saved === true ? 'saved' : 'save'}
                    width={20}
                    height={20} 
                    onClick={handleSavePost}
                    className={`cursor-pointer ${isSavingPost ? 'pointer-events-none' : ''}`}
                />
            </div>
        </>
        )}


    </div>
 
  )
}

export default PostStats

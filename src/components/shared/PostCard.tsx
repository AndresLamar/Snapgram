import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext"
import { multiFormatDateString } from "@/lib/utils";
import PostStats from "./PostStats";
import { IPostProps } from "@/types";

type PostCardProps = {
    post: IPostProps,
    handlePostClick: (post: IPostProps) => void
}

function PostCard( { post, handlePostClick} : PostCardProps) {

  const { user } = useUserContext()
  
  return (
    <div className= 'post-card'>
       <div className = 'flex-between'>
            <Link to={`/profile/${post.creator_id}`} className= 'flex items-center gap-3'>
                <img 
                src={post.creator?.imageurl ||'/assets/icons/profile-placeholder.svg'} alt="creator" 
                className='rounded-full w-12 lg:h-12'
                />
                <div className='flex flex-col'>
                    <p className='base-medium lg:body-bold text-light-1'>
                        {post.creator?.name}
                    </p>
                    <div className='flex-center gap-2 text-light-3'>
                        <p className='subtle-semibold lg:small-regular'>
                            {multiFormatDateString(post.created_at) }
                        </p>

                        <p className='subtle-semibold lg:small-regular'>
                            {post.location}
                        </p>
                    </div>
                </div>
            </Link>

            <Link to={`/update-post/${post.id}`} className={`${user.id !== post.creator_id && 'hidden'} `}>
                <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
            </Link>
       </div>

        <div className='small-medium lg:base-medium py-5'>
            <p className="text-start">{post.caption}</p>
            <ul className='flex gap-1 mt-2'>
                {post?.tags?.map((tag: string) => (
                    <li key={tag} className='text-light-3'>
                        #{tag}
                    </li>
                ))}
            </ul>
            </div>

            <img 
                src={post.imageurl || '/assests/icons/profile-placeholder.svg '} 
                className="post-card_img"
                alt='post image'
            />
            
       <PostStats post={post} userId={user.id} handlePostClick={handlePostClick}/>
    </div>
  )
}

export default PostCard
import Loader from "@/components/shared/Loader"
import PostStats from "@/components/shared/PostStats"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useCreateComment, useDeletePost, useGetCommetsForPost, useGetPostById } from "@/lib/react-query/queriesAndMutations"
import { multiFormatDateString } from "@/lib/utils"
import { useParams, Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { toast } from "@/components/ui/use-toast"
import Comments from "@/components/shared/Comments"
import { Input } from "@/components/ui/input"
import PostDetailsSkeleton from "@/components/skeletons/PostDetailsSkeleton"
import CommentsSkeleton from "@/components/skeletons/CommentsSkeleton"


function PostDetails() {
  const { id } = useParams()
  const postId = parseInt(id || '', 10);
  const { data: comments, fetchNextPage, hasNextPage, isPending: isFetchingComments } = useGetCommetsForPost(6, postId ?? '')
  const { mutateAsync: createComment, isPending: isLoadingCreate } = useCreateComment()

  const { data: post, isPending } = useGetPostById(postId)

  const { mutate: deletePost, isPending: isDeletingPost} = useDeletePost()
  const { user }  = useUserContext()
  const navigate = useNavigate()

  const [ comment, setComment ] = useState('')

  const { ref, inView} = useInView({
    /* Optional options */
    rootMargin: '500px 500px',
    threshold: 0.1,
  })

  useEffect(() => {
    if(inView && hasNextPage) fetchNextPage()
  },[inView, fetchNextPage, hasNextPage])

  const handleCommentPost = async (e: React.SyntheticEvent) => {
    if(isLoadingCreate) return

    e.preventDefault();

    const newComment = await createComment({ post_id: post.id, user_id: user.id, descr: comment })

    if(!newComment){
      toast({ title: 'Please try again'})
    } 

    setComment('')
  }

  const handleDeletePost = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if(!isDeletingPost){
      deletePost({ postId })
    }

    navigate('/')
  }

  return (
    <div className='post_details-container'>
      {isPending ? <PostDetailsSkeleton /> : (
        <div className='post_details-card'>
        <img 
          src={post?.imageurl} 
          alt="post"
          className="post_details-img" 
        />
        <div className= 'post_details-info'>
            <div className="flex flex-col gap-5 w-full">

              <div className='flex-between w-full'>

                <Link to={`/profile/${post?.creator_id}`} className="flex items-center gap-3">
                    <img 
                    src={post?.creator[0]?.imageurl ||'/assets/icons/profile-placeholder.svg'} alt="creator" 
                    className='rounded-full w-8 h-8 lg:w-12 lg:h-12'
                    />

                  <div className='flex flex-col'>
                      <p className='base-medium lg:body-bold text-light-1'>
                          {post?.creator[0]?.name}
                      </p>
                      <div className='flex-center gap-2 text-light-3'>
                          <p className='subtle-semibold lg:small-regular'>
                              {multiFormatDateString(post?.created_at) }
                          </p>

                          <p className='subtle-semibold lg:small-regular'>
                              {post?.location}
                          </p>
                      </div>
                  </div>
                </Link>

                <div className="flex-center">
                  <Link to={`/update-post/${post?.id}`} className={`${user.id !== post?.creator_id && 'hidden'}`}>
                    <img src="/assets/icons/edit.svg" alt="edit" width={24} height={24}/>
                  </Link>

                  <Button
                    onClick={handleDeletePost}
                    variant='ghost'
                    className={`ghost_details-delete_btn ${user.id !== post?.creator_id && 'hidden'}`}
                  >
                    <img 
                      src="/assets/icons/delete.svg" 
                      alt="delete"
                      width={24}
                      height={24} 
                    />
                  </Button>
                </div>

             </div>
                
              <div className='flex flex-1 w-full gap-2 small-medium lg:base-semibold'>
                <p className='text-light-1'>{post?.caption}</p>
                <ul className='flex gap-1 '>
                  {post?.tags?.map((tag: string) => (
                      <li key={tag} className='text-light-3'>
                          #{tag}
                      </li>
                  ))}
                </ul>
              </div>

              <hr className="border w-full border-dark-4/80"/>

            </div>
            
            <div className='w-full h-44 max-h-44 overflow-scroll custom-scrollbar'>

            {isFetchingComments ? <CommentsSkeleton /> :
               <>
                  {comments?.pages.map((item, index) => (
                    <Comments key={`page-${index}`} comments={item}/>
                  ))}

                  {hasNextPage && (
                    <div ref={ref} className='mt10'>
                      <Loader />
                    </div>
                  )}
               </>
              }
            </div>


            <div className="w-full">
                <PostStats post={post} userId={user.id}/>
            </div>
            
            <div className='flex w-full gap-3'>
              <img 
                src={user?.imageurl || '/assets/icons/profile-placeholder.svg' }
                alt="comment_creator"
                className='w-9 h-9 rounded-full' 
              />
              <div className='flex flex-between w-full rounded-lg bg-dark-3'>
                <Input
                  type='text'
                  placeholder='Write your comment...'
                  className='h-11 text-light-1 bg-dark-3 border-none placeholder:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 '
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  />
                <Button 
                  className={`${isLoadingCreate ? 'cursor-not-allowed opacity-50' : ''}`} 
                  onClick={handleCommentPost}
                >
                  <img 
                    src='/assets/icons/send.svg'
                    alt='send'
                    width={18}
                    height={18}
                  />
                </Button>
                  
              </div>
            </div>
              
            </div>          
        </div>
      )}
    </div>
  )
}

export default PostDetails
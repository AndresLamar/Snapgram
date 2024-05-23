import { useGetPostsForUser, useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { useParams,useLocation, Link  } from "react-router-dom";
import { useUserContext } from '@/context/AuthContext'
import FollowButton from "@/components/shared/FollowButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostsLiked from "@/components/shared/PostsLiked";
import PostsForUser from "@/components/shared/PostsForUser";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProfileDetailSkeleton } from "@/components/skeletons/ProfileSkeleton";

function Profile() {
  const { id } = useParams()
  const location = useLocation();

  const { data, isPending: isUserLoading } = useGetUserById(id ?? '')

  const { data: postss,  refetch: refetchPosts} = useGetPostsForUser(6, id ?? '')
  const { user } = useUserContext()

  useEffect(() => {
    // Refetch posts whenever the location (route) changes
    refetchPosts();
  }, [location.pathname, refetchPosts]);

  return (
      <div className="profile-container">
        {isUserLoading ? (
            <ProfileDetailSkeleton />
           ) : (
            <>
             <div className="profile-inner_container">
          
              <img 
                src={data?.imageurl ||'/assets/icons/profile-placeholder.svg'} alt="creator" 
                className='rounded-full w-32 lg:h-32 object-cover'
              />
              <div className="flex flex-col">
                <div className="flex gap-14">
                  <p className='h2-semibold lg:h1-semibold text-light-1 '>
                    {data.name}
                  </p>
                  {user.id === data.id ? 
                    <Link to={`/update-profile/${data.id}`} className='flex gap-3 items-center'>
                      <Button 
                      type="button" className={'shad-button_dark_4 '}>
                        <img 
                          src="/assets/icons/edit.svg" 
                          alt='edit-logo'
                          width={20}
                          height={20} 
                        />
                          <p className="small-medium">Edit Profile</p>
                      </Button> 
                    </Link>
                    : 
                    <FollowButton user={data} userId={user.id}
                />}
                </div>

                <p className='body-medium text-light-3'>
                  @{data.username}
                </p>


                <div className="mt-5 flex gap-10">
                  <div className="flex gap-3 ">
                    <p className="text-primary-500 body-medium">
                      {postss?.pages[0].length}
                    </p>
                    <p className="body-medium text-light-1">Posts</p>
                  </div>

                  <div className="flex gap-3">
                    <p className="text-primary-500 body-medium">
                      {data.follows.length}
                    </p>
                    <p className="body-medium text-light-1">Followers</p>
                  </div>

                  <div className="flex gap-3">
                    <p className="text-primary-500 body-medium">
                      {data.following.length}
                    </p>
                    <p className="body-medium text-light-1">Following</p>
                  </div>
                </div>

                <p className="base-regular max-w-xs xl:max-w-2xl mt-6">
                  {data.bio}
                </p>
              
              </div> 
            
             
        </div>

        <Tabs defaultValue="AllPosts" className="w-full ">
        <TabsList className="mb-14">
          <TabsTrigger value="AllPosts" className="profile-tab " >
          <img 
              src="/assets/icons/posts.svg" 
              alt='posts'
              width={20}
              height={20} 
            />
              <p className="small-medium lg:base-medium">Posts</p>
            
          </TabsTrigger>
          {user.id === data.id ? 
          <TabsTrigger value="LikedPosts" className="profile-tab">
            <img 
              src="/assets/icons/like.svg" 
              alt='posts'
              width={20}
              height={20} 
            />
              <p className="small-medium lg:base-medium">Liked</p>
          </TabsTrigger> : null}
        </TabsList>
        <TabsContent value="AllPosts">
          {postss?.pages[0].length > 0 ?
          <PostsForUser user_id={id ?? ''}/>  
           : <p className="body-medium text-light-3 text-center">No posts yet</p>}
          
        </TabsContent>
        {user.id === data.id ? <TabsContent value="LikedPosts">
          <PostsLiked user_id={id ?? ''}/>
        </TabsContent> : null}
      </Tabs>

          </>
      )} 
      </div>
  )
}

export default Profile
import React from 'react'
import { Button } from '../ui/button'
import { useFollowUser, useGetFollowersForUser } from '@/lib/react-query/queriesAndMutations'
import { IUser } from '@/types'
import Loader from './Loader'

type FollowButtonProps = {
    user: IUser
    userId: string
}

function FollowButton({ user, userId }: FollowButtonProps) {
  const { mutate: followUser, isPending: isFollowing } = useFollowUser()

  const { data: follows , isPending: isLoadingFollows} = useGetFollowersForUser(user.id)

  if(isLoadingFollows){
    return <Loader />
  }

    const handleFollowUser = (e: React.MouseEvent ) => {
        e.stopPropagation()
        if (!isFollowing) { 
            const isFollowedByUser = follows.includes(userId);
            
            const isFollow = !isFollowedByUser;  
            followUser({followerId: userId, followingId: user.id, isFollow}) 
        }
    }

  return (
    <>
        <Button 
          className={`${follows.includes(userId) ? 'shad-button_dark_4' : 'shad-button_primary'} whitespaces-nowrap mt-3`} onClick={handleFollowUser}> 
          <img 
                src="/assets/icons/follow.svg" 
                alt="follow"
                width={18}
                height={18} 
                className={`${follows.includes(userId) ? '' : 'invert-white'}`}
            />
          {follows.includes(userId) ? 'Following' : 'Follow'}
        </Button>
    </>
  )
}

export default FollowButton
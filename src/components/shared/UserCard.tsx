import { useUserContext } from "@/context/AuthContext"
import { IUser } from "@/types"
import FollowButton from "./FollowButton"
import { Link } from "react-router-dom";

type UserCardProps = {
  users: IUser[];
  size?: 'small' | 'large'; // Prop opcional para determinar el tamaño de la tarjeta
}

function UserCard({ users, size = 'small' }: UserCardProps) {

  const { user } = useUserContext()

  return (
    <>
        {users?.map(userr => (
            <li className={`flex flex-center flex-col ${size === 'large' ? 'py-10 px-16' : 'py-4 px-6'} rounded-3xl border border-dark-4`}  key={userr.id}>
              <Link to={`/profile/${userr.id}`} className="flex flex-center flex-col">
                <img 
                    src={userr.imageurl || "/assets/icons/profile-placeholder.svg"} 
                    alt="profile_picture"
                    className={`rounded-full ${size === 'large' ? 'w-20 h-20' : 'w-11 h-11'} mb-3`}
                />
                <p className="base-medium lg:body-bold text-light-1">{userr.name}</p>
                <p className="text-light-3 subtle-semibold lg:small-regular">@{userr.username}</p>
              </Link> 
                <FollowButton user={userr} userId={user.id} />
            </li>
        ))}
    </>
  )
}

export default UserCard
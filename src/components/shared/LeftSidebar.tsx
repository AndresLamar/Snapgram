import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { useUserContext, INITIAL_USER } from "@/context/AuthContext"
import { sidebarLinks } from "@/constants"
import { INavLink } from "@/types"
import LeftSideUserSkeleton from "../skeletons/LeftSideUserSkeleton"

function LeftSidebar() {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext() 

  const signOut = () => {
    localStorage.clear()
    setUser(INITIAL_USER)
    setIsAuthenticated(false)
    navigate('/sign-in')
  }

  return (
    <nav className='leftsidebar '>
      <div className='flex flex-col '>
        <Link to='/' className='flex gap-3 items-center'>
          <img 
            src='/assets/images/logo.svg'
            alt='logo'
            width={170}
            height={36}
          />
        </Link>

        {isLoading ? (
          <LeftSideUserSkeleton />
        ) : (
          <>
            <Link to={`/profile/${user.id}`} className='flex gap-3 mt-8 items-center'>   
              <img 
                  src={user.imageurl || '/assets/icons/profile-placeholder.svg'}
                  alt='profile'
                  className='h-14 w-14 rounded-full object-cover'
                />
                
                <div className='flex flex-col'>
                  <p className='body-bold'>
                    {user.name}
                  </p>
                  <p className='small-regular text-light-3'>
                    @{user.username}
                  </p>
                </div>
            </Link>
          </>
        )}

        

        <ul className='flex flex-col gap-2'>
          {sidebarLinks.map((link: INavLink) => {

            const isActive = pathname === link.route

            return (
              <li key={link.label} className={`leftsidebar-link group first-of-type:mt-6 ${isActive && 'bg-primary-500 before:content-[""] before:bg-primary-500 before:w-14   before:h-16 before:absolute before:rounded-full before:left-[-49px] '}`}>
                <NavLink
                  to={link.route}
                  className='flex gap-4 items-center p-4'
                >
                  <img 
                    src={link.imgURL} 
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}  
                  />
                  {link.label}
                </NavLink>  
              </li>
            )
          })}
        </ul>
      </div>

      <Button 
        variant='ghost' className='shad-button_ghost' onClick={() => signOut()}>
            <img src='/assets/icons/logout.svg' alt='logout'/>
            <p className='small-medium lg:base-medium'>
              Logout
            </p>
      </Button>

    </nav>
    )
}

export default LeftSidebar
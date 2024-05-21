import { IContextType, IUser } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '@/services/api'

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageurl: '',
    bio: '',
    token: ''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("cookieFallback"))

    const navigate = useNavigate()

    const checkAuthUser = async () => {

        try {
            const userId = localStorage.getItem('userId') ?? ''
        
            const currentAccount = await getCurrentUser({ userId })

            if (currentAccount){
                setUser({
                    id: currentAccount.id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageurl: currentAccount.imageurl,
                    bio: currentAccount.bio,
                })


                setIsAuthenticated(true)

                return true
            }

            return false

        } catch (error) {
            console.log(error);
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
          cookieFallback === "[]" ||
          cookieFallback === null ||
          cookieFallback === undefined
        ) {
          navigate("/sign-in");
        }
    
        checkAuthUser();
      }, []);
    

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

  return (
    <AuthContext.Provider value={value} >
        {children}
    </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)
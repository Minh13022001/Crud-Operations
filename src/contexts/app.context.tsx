import { createContext, useState } from "react"
import { Result } from "../type/result"
import { getProfileFromLS } from "../utils/authen"

interface AppContextInterface {

    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    profile: Result | null
    setProfile: React.Dispatch<React.SetStateAction<Result | null>>
    users: Result[] | null
    setUser: React.Dispatch<React.SetStateAction<Result[] | null>>
  }
  
  const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getProfileFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null,
    users: [],
    setUser: () => null
  }
  
  export const AppContext = createContext<AppContextInterface>(initialAppContext)
  
  export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
    const [profile, setProfile] = useState<Result | null>(initialAppContext.profile)
    const [users, setUser] = useState<Result[] | null>(initialAppContext.users)

    return (
      <AppContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          profile,
          setProfile,
          users,
          setUser
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
  
  
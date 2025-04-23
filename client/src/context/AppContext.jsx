import { createContext, useState } from "react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000";
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

 // Initialize auth state from localStorage
 

    const value = {
        backendurl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        setIsLoading,
        isLoading,
        
        
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
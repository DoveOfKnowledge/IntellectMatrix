import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

//eslint-disable-next-line react/props-types
export const AuthProvider = ({children}) => {

  

    const [token, setToken] = useState(localStorage.getItem("token"));

    const [user, setUser] = useState("");


    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };


//if token then true else false
let isLoggedIn = !!token;
console.log("isLoggedIn",isLoggedIn);

//logout functionality
const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
};


//JWT authentication to get the currently loggedin user data

const userAuthentication = async () => {
    try{
        const response = await fetch("http://localhost:5000/api/auth/user", {
            method : "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response);
        const data = await response.json();
    
        if(response.ok){
            
            console.log("user data", data.userData);
            setUser(data.userData);
        }
        console.log(response);

    }catch(error){
        console.error("Error fetching user data");
    }
};


useEffect(() => {
    userAuthentication();
}, []);


return (
<AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user}}>
    {children}
</AuthContext.Provider>
);
};

 
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
      throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
  };
 
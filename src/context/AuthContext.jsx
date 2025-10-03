import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const {data, err, loading, get} = useFetch('auth/check-login')
  
  if (err) console.error('Authentication check fail', err);

  const checkAuth = async () => {
    const res = await get('auth/check-login');
    if (res && res.isLogin) setIsLogin(res.isLogin)
  }

  useEffect(() => {
    if (data && data.isLogin) setIsLogin(data.isLogin)
  }, [data])
  
  const authData = { isLogin, setIsLogin, loading, checkAuth}

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  )
};

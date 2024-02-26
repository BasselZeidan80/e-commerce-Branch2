import React, { createContext, useEffect, useState } from 'react'


export const AuthContextProvider = createContext()


export default function AuthContextPProvider({children}) {

const [token , setToken] = useState(null)



useEffect(()=> {
  if(localStorage.getItem('token')!==null){
    console.log("refresh");
    setToken(localStorage.getItem('token'))
  }

},[])


  return <AuthContextProvider.Provider value={{token , setToken}}>

    {children}
  </AuthContextProvider.Provider>
}

import React, { createContext, useContext, useState } from 'react'



export const CounterContext= createContext()
export default function CounterContextProvider(props) {
   
    const [count , setCounter] =useState(0)

    function changeCount(){
      setCounter(Math.random())
    }
    return <CounterContext.Provider value={{count , changeCount}}>

    {props.children}

        
    </CounterContext.Provider>
   
}

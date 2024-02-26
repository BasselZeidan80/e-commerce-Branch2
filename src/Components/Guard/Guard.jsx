import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Guard({children}) {
        if(localStorage.getItem('token') == null){
            return <Navigate to={'/Login'} />
        }

  return <>
  {children}
  </>
}

import {Route, Redirect} from 'react-router-dom';
import { useEffect } from 'react';
import store from '../../store/store'
import { useState } from '@hookstate/core';

const ProtectedRoute = ({component, path}) => {
    const {isAuth} = useState(store)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            isAuth.set(true)
        }
    } ,[])
    

    return (
        isAuth.get() ?
        <Route path={path} exact>
            {component}
        </Route>
        :
        <Redirect
            to={{
              pathname: "/",
            }}
          />
    )
}

export default ProtectedRoute

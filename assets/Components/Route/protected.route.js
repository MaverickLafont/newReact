import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthService from "../../Services/auth.service"


export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
    (props) => {
        if(AuthService.checkAuth()){
            return <Component {...props}/>;
        } else {
            return <Redirect to={
                {
                    pathname: "/",
                    state: {
                        from: props.location
                    }
                }
            } />
        }
    }
}/>
)
}
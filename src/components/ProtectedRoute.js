import React from 'react'
import {useSelector} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = ({component:Component, ...rest})=>{
    const userData = useSelector((state)=>{
        return state.userDetails
    })
    
    return(
        <Route
            {...rest}
            render={(props)=>{
                if(userData.auth){
                    return <Component {...props}/>
                }else{
                    return <Redirect to={{
                        pathname: "/login",
                        state:{
                            from : props.location
                        }
                    }}/>
                }
            }}
        />
    )
}

export default ProtectedRoute
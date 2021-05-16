import React from 'react'
import {useSelector} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import '../styles/styles.css'

const Account = (props)=>{
    const userData = useSelector((state)=>{
        return state.userDetails
    })

    return(
        <div  className="regLoginContainer">
            <Paper elevation={2}>
                <div style={{width:'500px', height:'200px', display:'flex', flexDirection:'column', justifyContent:'center', padding:'15px', paddingBottom:'30px'}}>
                    <h2><Typography variant="h5">Account</Typography></h2>
                    <h3 style={{borderBottom:'1px solid grey'}}><Typography variant="subtitle1">Username : {userData.username}</Typography></h3>
                    <h3 style={{borderBottom:'1px solid grey'}}><Typography variant="subtitle1">Email : {userData.email}</Typography></h3>
                    <h3 style={{borderBottom:'1px solid grey'}}><Typography variant="subtitle1">Date Created : {new Date(userData.createdAt).toDateString()}</Typography></h3>
                </div>
            </Paper>
        </div>
    
    )
}

export default Account
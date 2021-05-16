import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import {Link} from 'react-router-dom'
import '../styles/styles.css'

const Home = (props)=>{
    const userData = useSelector((state)=>{
        return state.userDetails
    })
    const dispatch = useDispatch()
    
    return(
        <div style={{display:'flex', justifyContent:'space-evenly'}}>
            <img style={{height:'500px', width:'50%', marginTop:'10px'}} src="https://images.unsplash.com/photo-1518976024611-28bf4b48222e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bm90ZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"/>
            
            <div style={{width:'400px', height:'400px', display:'flex', flexDirection:'column',  justifyContent:'center'}}>
                {userData.auth && <Typography variant="h5">{`WELCOME ${userData.username?.toUpperCase()}!`}</Typography>}
                <Typography variant="h4"> A simple solution to store your notes</Typography>
                <Typography variant="subtitle1">Save and manage your notes</Typography>
            
                {userData.auth || <Button variant="contained" style={{marginTop:'10px', width:'150px'}}><Link to="/register" className="linkStyle">Get started</Link></Button>}
            </div>
        </div>
    )
}

export default Home
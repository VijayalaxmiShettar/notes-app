import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Account from './Account'
import NotesContainer from './NotesContainer'
import {addUserData} from '../actions/actions'
import {AppBar, Typography, Button, Toolbar} from '@material-ui/core' 
import {makeStyles} from '@material-ui/styles' 
import '../styles/styles.css'
import {getUserDetails} from '../actions/actions'
import ProtectedRoute from './ProtectedRoute'

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    toolbarStyle: {
        backgroundColor: 'black',
    },
  }));

const NavBar = (props)=>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const userData = useSelector((state)=>{
        return state.userDetails
    })
    console.log(userData)
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            dispatch(getUserDetails(token))
        }
    }, [])

    const handleLogout = ()=>{
        const token = localStorage.getItem('token')
        axios.delete('http://dct-user-auth.herokuapp.com/users/logout', {
            headers:{
                'x-auth': token
            }
        })
            .then((res)=>{
                swal({text: 'Successfully logged out', icon:'success'})
                dispatch(addUserData({auth: false}))
            })
            .catch((err)=>{
                swal({text: err.message, icon:"error" })
            })
        localStorage.removeItem('token')
    }
    
    return(
        <div >
            <AppBar>
                <Toolbar>
                        <Typography variant="h5" style={{flexGrow:1, cursor:'pointer', color:'white'}}>
                        <Link to="/" className="linkStyle" style={{color:'white'}}> My Notes App </Link>
                        </Typography>
                    
                    {userData.auth ? (
                        <>
                            <Button><Link to="/account" className="linkStyle" ><li>Account</li></Link></Button>
                            <Button><Link to="/notes" className="linkStyle"><li>My Notes</li></Link></Button>
                            <Button><Link to="/" onClick={handleLogout} className="linkStyle"><li>Logout</li></Link></Button>
                        </>
                    ):(
                        <>
                            <Button><Link to="/register" className="linkStyle"> <li>Register</li></Link></Button>
                            <Button><Link to="/login" className="linkStyle"><li> Login</li></Link></Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            
            <Route path="/" component={Home} exact={true}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            
            <ProtectedRoute path="/account" component={Account}/>
            <ProtectedRoute path="/notes" component={NotesContainer}/>
            
        </div>
    )
}

export default NavBar

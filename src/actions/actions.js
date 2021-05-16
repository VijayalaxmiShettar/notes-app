import axios from 'axios'
import swal from 'sweetalert'

export const getUserDetails = (token)=>{
    return (dispatch)=>{
        axios.get('http://dct-user-auth.herokuapp.com/users/account',{
            headers:{
                "x-auth": token
            }
        })
            .then((res)=>{
                console.log({...res.data, auth: true})
                dispatch(addUserData({...res.data, auth: true}))
                //dispatch(addAuthStatus(true))
            })
            .catch((err)=>{
                dispatch(addUserData({auth:false}))
                swal({text: err.message, icon:"error" })
                //alert(err.message)
            })
    }
}

export const addUserData = (data)=>{
    return {
        type: 'ADD_USER_DATA',
        payload: data
    }
}


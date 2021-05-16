const initialValue = {auth: Boolean(localStorage.getItem('token'))}

const userReducer = (state = initialValue, action)=>{
    switch(action.type){
        case 'ADD_USER_DATA' : {
            return {...action.payload}
        }
        default: return state
    }
}

export default userReducer
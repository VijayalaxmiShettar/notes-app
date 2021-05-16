import axios from 'axios'
import swal from 'sweetalert'

export const getNotes = (token)=>{
    return (dispatch)=>{
        axios.get('http://dct-user-auth.herokuapp.com/api/notes',{
            headers:{
                'x-auth': token
            }
        })
            .then((res)=>{
                console.log(res.data)
                dispatch(setNotesList(res.data))
            })
            .catch((err)=>{
                swal({text: err.message, icon:"error" })
            })
    }
}

export const setNotesList = (data)=>{
    return {
        type: 'SET_NOTES_LIST',
        payload: data
    }
}

export const asyncAddNote = (token, data) =>{
    return (dispatch)=>{
        axios.post('http://dct-user-auth.herokuapp.com/api/notes', data, {
            headers:{
                'x-auth': token
            }
        })
            .then((res)=>{
                console.log(res.data)
                dispatch(addNote(res.data))
            })
            .catch((err)=>{
                swal({text: err.message, icon:"error" })
            })
    }
}

export const addNote = (data)=>{
    return{
        type:'ADD_NOTE',
        payload: data
    }
}

export const asyncDeleteNote = (token, id)=>{
    return (dispatch)=>{
        axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
            headers:{
                'x-auth': token
            }
        })
            .then((res)=>{
                console.log(res.data)
                dispatch(deleteNote(res.data))
            })
            .catch((err)=>{
                swal({text: err.message, icon:"error" })
            })
    }
}

export const deleteNote = (data) => {
    return {
        type: 'DELETE_NOTE',
        payload : data
    }
}

export const asyncUpdateNote = (token, data, id) =>{
    return (dispatch, getState) =>{
        axios.put(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, data, {
            headers: {
                'x-auth': token
            }
        })
            .then((res)=>{
                console.log(res.data)
                const response = res.data
                const state = getState()
                const resList = state.notes.map((note)=>{
                    if(note._id == id){
                        return {...note, title: response.title, body: response.body}
                    }else{
                        return {...note}
                    }
                })
                console.log(resList)
                dispatch(updateNote(resList))
            })
            .catch((err)=>{
                swal({text: err.message, icon:"error" })
            })
    }
}

export const updateNote = (data)=>{
    return{
        type:'UPDATE_NOTE',
        payload: data
    }
}
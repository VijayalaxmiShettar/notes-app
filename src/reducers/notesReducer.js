

const initialValue = []

const notesReducer = (state=initialValue, action)=>{
    switch(action.type){
        case 'SET_NOTES_LIST' : return [...action.payload]
        case 'ADD_NOTE' : return [action.payload, ...state]
        case 'DELETE_NOTE': {
            const res = state.filter((note)=>{
                return note._id != action.payload._id
            })
            
            return res
        }
        case 'UPDATE_NOTE' :{
            return action.payload
        }
        default : return state
    }
}

export default notesReducer
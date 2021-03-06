import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {asyncAddNote, asyncUpdateNote} from '../actions/notesActions'
import {TextField, Button} from '@material-ui/core/';
import '../styles/styles.css'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    textFieldClass: {
        marginBottom:'20px',
        width:'100%',

    },
  });

const NoteForm = (props)=>{
    const {id, title:editTitle, body:editBody, handleEdit} = props

    const [title, setTitle] = useState(editTitle || '')
    const [body, setBody] = useState(editBody|| '')
    const dispatch = useDispatch()
    const classes = useStyles();

    const handleSubmit = (e)=>{
        const token = localStorage.getItem('token')
        e.preventDefault()
        const data = {
            title,
            body
        }
        //dispatch
        if(id){ //if id is passed to Note form, call update action creator else call add   
            dispatch(asyncUpdateNote(token, data, id))
            handleEdit()
        }else{
            dispatch(asyncAddNote(token, data))
        }
        
        setTitle('')
        setBody('')
    }

    const handleChange = (e)=>{
        const name = e.target.name
        const value= e.target.value
        if(name == 'title'){
            setTitle(value)
        }else{
            setBody(value)
        }
    }
    
    return(
        
            <form onSubmit={handleSubmit} style={{width:'80%'}}>
                <TextField required value={title} name="title" onChange={handleChange} className={classes.textFieldClass} variant="outlined" size="small" label="Title"/><br/>
                <TextField required value={body} name="body" onChange={handleChange} multiline={true} className={classes.textFieldClass} variant="outlined" label="Body" rows="4" /><br/>
                
                <Button type="submit" variant="contained" size="small">Save</Button>
            </form>
        
    )
}

export default NoteForm
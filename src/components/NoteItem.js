import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button, Typography, Grid, GridListTileBar, Paper, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import {asyncDeleteNote} from '../actions/notesActions'
import EditNote from './EditNote'

const NoteItem = (props)=>{
    const {_id, title, body, token} = props
    const [editToggle, setEditToggle] = useState(false)
    
    const dispatch = useDispatch()

    const handleDelete = (id)=>{
        dispatch(asyncDeleteNote(token, id))
    }

    const handleEdit = ()=>{
        setEditToggle(!editToggle)
    }
    
    return(
        <Grid item  style={{width:'40%', margin:'15px'}}>
            <Paper style={{padding:'10px'}}>
                <div style={{height:'200px'}}>
                        <>
                            <Typography variant="subtitle1"><h3>{title}</h3></Typography>
                            <Typography variant="subtitle1" style={{height:'100px', border:'1px solid rgb(191, 199, 195)', borderRadius:'5px', overflowY:'auto', marginBottom:'10px'}}>{body}</Typography>
                            
                            <IconButton onClick={()=>{handleDelete(_id)}} size="small" style={{margin:'10px'}}><DeleteIcon/></IconButton>
                            <IconButton onClick={handleEdit} size="small"><EditIcon/></IconButton>
                        </>
                    <EditNote handleEdit={handleEdit} editToggle={editToggle} id={_id} title={title} body={body}/>
                </div>
            </Paper>
        </Grid>
    )
}

export default NoteItem
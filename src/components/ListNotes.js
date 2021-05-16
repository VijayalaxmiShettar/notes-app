import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getNotes} from '../actions/notesActions'
import NoteItem from './NoteItem'
import {Grid, Typography} from '@material-ui/core/';

const ListNotes = (props)=>{
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const notes = useSelector((state)=>{
        return state.notes
    })

    useEffect(()=>{
        dispatch(getNotes(token))
    }, [])

    return(
        <div>
            <Typography variant="h5" align="center">Your Notes</Typography>
            <Grid container xs={12} style={{ minHeight:'300px',maxHeight:'500px', overflow:'scroll', padding:'10px', border:'1px solid rgb(190, 206, 232)', borderRadius:'5px'}}>
                {notes.length == 0 && <div><Typography variant="h6">No notes found add your first note</Typography></div>}
                <Grid container>
                    {notes.map((note)=>{
                        return <NoteItem key={note._id} {...note} token={token}/>
                    })}
                </Grid>
            </Grid>
        </div>
    )
}

export default ListNotes
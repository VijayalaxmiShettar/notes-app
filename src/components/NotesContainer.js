import React from 'react'
import ListNotes from './ListNotes'
import NoteForm from './NoteForm'
import '../styles/styles.css'
import { Typography, Grid } from '@material-ui/core'

const NotesContainer = (props)=>{
    return(
        <Grid container>
            <Grid item xs={9}>
                <ListNotes/>
            </Grid>
            <Grid item xs={3} className="regLoginDiv">
                <Typography variant="h4">Add Note</Typography>
                <NoteForm/>
            </Grid>
        </Grid>
        
    )
}

export default NotesContainer
import React from 'react'
import {Dialog, DialogTitle, DialogContent, Button} from '@material-ui/core/';
import NoteForm from './NoteForm'

const EditNote = (props)=>{
    const {editToggle, handleEdit, id, title, body} = props
    
    return(
        <div style={{width:'70%'}}>
            <Dialog onClose={handleEdit} open={editToggle} fullWidth={true}>
                <DialogTitle>Edit Note</DialogTitle>
                <DialogContent>
                    <NoteForm handleEdit={handleEdit} id={id} title={title} body={body} />
                    <Button onClick={handleEdit} size="small">Cancel</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditNote
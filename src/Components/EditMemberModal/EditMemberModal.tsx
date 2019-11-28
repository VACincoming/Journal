import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import './editMemberModal.css'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

function EditMemberModal(props:any){
  const {onClose, open, users} = props
  const handleClose = () => {
    onClose()
  } 

  return(
    <Dialog onClose={handleClose} open={open} className='DialogWidth'>
      <div className='wrapperEditMember'>
          {
            users && users.map((el:any) => {
              if(el.id !== null){
                return(
                  <div className='listItemWrapper' key={el.id}>
                    <h4>{el.firstName} {el.lastName}</h4>
                    <Button variant="contained" color="primary">Change role</Button>
                  </div>
                )
              }
            })
          }
      </div>
    </Dialog>
  )
}

export default EditMemberModal
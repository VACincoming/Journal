import React from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function EditMemberListItem(props:any){
  const {member, handleOpenEditMemberModal} = props
  return(
    <Grid container className='mainPageContent-wrapper' justify='center'>
      <Grid item xl={7} lg={7} md={8} sm={9} xs={10} >
        <div className='listItemWrapper' style={{background: '#22272B', height: "100px", color: '#fff'}}>
          <h3>{member}</h3>
          <Button variant="contained" color="primary" onClick={handleOpenEditMemberModal}>
            EDIT MEMBER
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}
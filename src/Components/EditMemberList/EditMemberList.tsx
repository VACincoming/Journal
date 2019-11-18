import React, {Fragment} from 'react'
import './editMemberList.css'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
function ListItem(props:any){
  const {member} = props
  return(
    <Grid container className='mainPageContent-wrapper' justify='center'>
      <Grid item xs={7}>
        <div className='listItemWrapper'>
          <h3>{member}</h3>
          <Button variant="contained" color="primary">
            EDIT MEMBER
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

function EditMemberList(){
  return(
    <Fragment>
      <ListItem member={'MONITOR'}/>
      <ListItem member={'STUDENTS'}/>
    </Fragment>
  )
}

export default EditMemberList
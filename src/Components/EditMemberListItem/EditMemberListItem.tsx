import React from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next'
interface IEditMemberListItem{
  member: string,
  name: string,
  handleOpenEditMemberModal: (name:string) => void 
}

const EditMemberListItem:React.FC<IEditMemberListItem> = ({member, handleOpenEditMemberModal, name}) => {
  const {t} = useTranslation()
  return(
    <Grid container className='mainPageContent-wrapper' justify='center'>
      <Grid item xl={7} lg={7} md={8} sm={9} xs={10} >
        <div className='listItemWrapper' style={{background: '#22272B', height: "100px", color: '#fff'}}>
          <h3>{member}</h3>
          <Button variant="contained" color="primary" onClick={()=>handleOpenEditMemberModal(name)}>
            {t('EditMember')}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}
export default EditMemberListItem
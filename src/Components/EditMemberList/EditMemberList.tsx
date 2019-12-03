import React, {useState, useEffect, Fragment} from 'react'
import EditMemberListItem from '../EditMemberListItem'
import EditMemberModal from '../EditMemberModal'
import './editMemberList.css'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { withJournalService } from '../../hoc';
import { fetchGetAllUsers } from '../../actions'
import { useTranslation } from 'react-i18next'

function EditMemberList(props:any){
  let listItem = null;
  const { t } = useTranslation()
  const [openEditMemberModal, setOpenEditMemberModal] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState('');
  const {fetchGetAllUsers, users, journalService} = props
  const [selectedUsers, setSelectedUsers] = useState([])
  let usersVariable:any = [];
  const member = [
    {"title": t("Monitors"), "name": "Monitors"},
    {"title": t("Students"), "name": "Students"}
  ]
  const handleOpenEditMemberModal = (title:string):void => {
    setSelectedMembers(title)

    if(title === 'Students'){
      usersVariable = users.filter((el:any) => el.role === 'STUDENT')
      setSelectedUsers(usersVariable)
    }else if(title === 'Monitors'){
      usersVariable = users.filter((el:any) => el.role ==='MONITOR')
      setSelectedUsers(usersVariable)
    }
    setOpenEditMemberModal(true)
  }
  const handleCloseEditMemberModal = ():void => {
    setOpenEditMemberModal(false)
  }
  const handleChangeRole = (id:number, role: string, email:string, username:string) => {
    return(
      journalService.changeRole(id, role, email, username).then(() => fetchGetAllUsers())).then(()=> console.log(users))
    }
  listItem = (
     member.map((el:any) => {
      return(
        <EditMemberListItem key={el.name} member={el.title} name={el.name} handleOpenEditMemberModal={handleOpenEditMemberModal} />
      )
    }))
    useEffect(() => {
      fetchGetAllUsers()
    }, [fetchGetAllUsers])
  return(
    <Fragment>
      {listItem}
      <EditMemberModal open={openEditMemberModal} onClose={handleCloseEditMemberModal} users={selectedUsers} selectedMembers={selectedMembers} handleChangeRole={(id:number, role:string, email:string, username:string) => handleChangeRole(id, role,email, username)}/>
    </Fragment>
  )
}

const mapStateToProps = (state:any) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const {journalService} = ownProps;
  return bindActionCreators({
    fetchGetAllUsers: fetchGetAllUsers(journalService)
  }, dispatch)
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(EditMemberList))
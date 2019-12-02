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
  const {fetchGetAllUsers, users} = props
  const [selectedUsers, setSelectedUsers] = useState(users)
  let usersVariable = [];
  const member = [
    {"title": t("Monitors"), "name": "Monitors"},
    {"title": t("Students"), "name": "Students"}
  ]
  const handleOpenEditMemberModal = (selectedMembers:string):void => {
    setSelectedMembers(selectedMembers)
    setOpenEditMemberModal(true)
  }
  const handleCloseEditMemberModal = ():void => {
    setOpenEditMemberModal(false)
  }
  listItem = (
     member.map((el:any) => {
      return(
        <EditMemberListItem key={el.name} member={el.title} name={el.name} handleOpenEditMemberModal={handleOpenEditMemberModal}/>
      )
    }))
    useEffect(() => {
      fetchGetAllUsers()
    }, [fetchGetAllUsers])
  return(
    <Fragment>
      {listItem}
      <EditMemberModal open={openEditMemberModal} onClose={handleCloseEditMemberModal} users={selectedUsers} selectedMembers={selectedMembers}/>
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
import React, {useState, useEffect, Fragment} from 'react'
import EditMemberListItem from '../EditMemberListItem'
import EditMemberModal from '../EditMemberModal'
import './editMemberList.css'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { withJournalService } from '../../hoc';
import { fetchGetAllUsers } from '../../actions'
function EditMemberList(props:any){
  let listItem = null;
  const [openEditMemberModal, setOpenEditMemberModal] = useState(false)
  const {fetchGetAllUsers, users} = props
  const member = [
    "MONITORS","STUDENTS"
  ]
  const handleOpenEditMemberModal = () => {
    setOpenEditMemberModal(true)
  }
  const handleCloseEditMemberModal = () => {
    setOpenEditMemberModal(false)
  }
  listItem = (
     member.map((el:any) => {
      return(
        <EditMemberListItem key={el} member={el} handleOpenEditMemberModal={handleOpenEditMemberModal}/>
      )
    }))
    useEffect(() => {
      fetchGetAllUsers()
    }, [fetchGetAllUsers])
  return(
    <Fragment>
      {listItem}
      <EditMemberModal open={openEditMemberModal} onClose={handleCloseEditMemberModal} users={users}/>
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
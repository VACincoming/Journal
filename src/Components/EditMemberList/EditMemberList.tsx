import React, {useState, useEffect, Fragment} from 'react'
import EditMemberListItem from '../EditMemberListItem'
import EditMemberModal from '../EditMemberModal'
import './editMemberList.css'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { withJournalService } from '../../hoc';
import { fetchGetAllUsers, fetchLoaderOn,fetchLoaderOff } from '../../actions'
import { useTranslation } from 'react-i18next'
import {IUsers, IUser} from '../../interfaces/Interfaces'

type EditMemberListProps = {
  users: IUsers[],
  loading: boolean,
  fetchGetAllUsers: any,
  journalService: any,
  fetchLoaderOn: any,
  fetchLoaderOff: any,
}

const EditMemberList: React.FC<EditMemberListProps> = ({
  fetchGetAllUsers, users, journalService, fetchLoaderOn, fetchLoaderOff, loading}) => {
  let listItem = null;
  const { t } = useTranslation()
  const [openEditMemberModal, setOpenEditMemberModal] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<IUsers[] | []>([])
  let usersVariable: IUsers[] = [];
  const member = [
    {"title": t("Monitors"), "name": "Monitors"},
    {"title": t("Students"), "name": "Students"}
  ]
  const handleOpenEditMemberModal = (title:string):void => {
    setSelectedMembers(title)

    if(title === 'Students'){
      usersVariable = users.filter((el:IUser):boolean => el.role === 'STUDENT')
      setSelectedUsers(usersVariable)
    }else if(title === 'Monitors'){
      usersVariable = users.filter((el:IUser):boolean => el.role ==='MONITOR')
      setSelectedUsers(usersVariable)
    }
    setOpenEditMemberModal(true)
  }
  const handleCloseEditMemberModal = ():void => {
    setOpenEditMemberModal(false)
  }
  async function handleChangeRole(id:number, role: string, email:string, username:string){
      fetchLoaderOn()
      await journalService.changeRole(id, role, email, username)
      await fetchGetAllUsers()
      fetchLoaderOff()
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
      <EditMemberModal loading={loading} open={openEditMemberModal} onClose={handleCloseEditMemberModal} users={selectedUsers} selectedMembers={selectedMembers} handleChangeRole={(id:number, role:string, email:string, username:string) => handleChangeRole(id, role,email, username)}/>
    </Fragment>
  )
}

const mapStateToProps = ({users, loading}:{users: IUsers[], loading:boolean}) => {
  return {
    users,
    loading
  }
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const {journalService} = ownProps;
  return bindActionCreators({
    fetchLoaderOn: fetchLoaderOn(),
    fetchLoaderOff: fetchLoaderOff(),
    fetchGetAllUsers: fetchGetAllUsers(journalService)
  }, dispatch)
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(EditMemberList))
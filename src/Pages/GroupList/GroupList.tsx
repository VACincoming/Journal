import React, { useState, useEffect } from 'react'
import './groupList.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'
import GroupListTable from '../../Components/GroupListTable'
import { withJournalService } from '../../hoc';
import {fetchGetAllUsers, fetchLoaderOn, fetchLoaderOff, fetchSchedule} from '../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

function GroupList(props:any){
  const { t } = useTranslation()
  const {fetchGetAllUsers, fetchSchedule, users, schedule, journalService} = props
  const [weekType, setWeekType] = useState('ODD')
  const changeWeek = ():void => {
    if(weekType === 'ODD'){
      setWeekType("EVEN")
      fetchSchedule(weekType)
    }else {
      setWeekType("ODD")
      fetchSchedule(weekType)
    }
  }
  const getRegistry = () => {
    journalService.getRegistry()
  }
  useEffect(() => {
    fetchGetAllUsers()
  }, [fetchGetAllUsers])
  useEffect(() => {
    fetchSchedule(weekType)
  }, [])
  return(
    <>
      <Header title={t('GroupList')}/>
      <GroupListTable 
        users={users}
        weekType={weekType}
        changeWeek={changeWeek}
        schedule={schedule}
        getRegistry={getRegistry}/>
    </>
  )
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const {journalService} = ownProps;
  return bindActionCreators({
    fetchGetAllUsers: fetchGetAllUsers(journalService),
    fetchSchedule: fetchSchedule(journalService),
    fetchLoaderOn: fetchLoaderOn(),
    fetchLoaderOff: fetchLoaderOff(),
  }, dispatch)
}

const mapStateToProps = (state:any) => {
  if(state){
    return {
      loading: state.loading,
      users: state.users,
      schedule: state.schedule
    }
  }else return {state}
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(GroupList));
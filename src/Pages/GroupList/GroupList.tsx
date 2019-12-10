import React, { useState, useEffect } from 'react'
import './groupList.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'
import GroupListTable from '../../Components/GroupListTable'
import { withJournalService } from '../../hoc';
import {fetchGetAllUsers, fetchLoaderOn, fetchLoaderOff, fetchSchedule, fetchRegistry} from '../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import RegistryTabs from '../../Components/RegistryTabs'
import GetRegistry from '../../Components/GetRegistry'
import moment from 'moment'
function GroupList(props:any){
  const { t } = useTranslation()
  const {fetchGetAllUsers, fetchSchedule, users, user, schedule, fetchRegistry, registry} = props
  let activeComponent = null
  useEffect(() => {
    fetchGetAllUsers()
  }, [fetchGetAllUsers])
  useEffect(() => {
    fetchRegistry(moment().format('YYYY-MM-DD'))
  }, [])
  if(user && user.role === "MONITOR"){
    activeComponent = 
    <RegistryTabs 
      users={users}
      registry={registry}
    />
  }else if(user && user.role === 'ADMIN'){
    activeComponent = <GetRegistry />
  }else activeComponent = <GroupListTable users={users}/>
  return(
    <>
      <Header title={t('GroupList')}/>
      {activeComponent}
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
    fetchRegistry: fetchRegistry(journalService),
  }, dispatch)
}

const mapStateToProps = (state:any) => {
  if(state){
    return {
      user: state.user,
      loading: state.loading,
      users: state.users,
      schedule: state.schedule,
      registry: state.registry
    }
  }else return {state}
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(GroupList));
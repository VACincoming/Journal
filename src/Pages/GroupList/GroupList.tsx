import React, { useState, useEffect } from 'react'
import './groupList.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'
import GroupListTable from '../../Components/GroupListTable'
import { withJournalService } from '../../hoc';
import {fetchGetAllUsers, fetchLoaderOn, fetchLoaderOff, fetchSchedule, fetchRegistry,
  fetchSubjects} from '../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import RegistryTabs from '../../Components/RegistryTabs'
function GroupList(props:any){
  const { t } = useTranslation()
  const {fetchGetAllUsers, fetchSchedule, users, schedule, fetchRegistry, registry} = props
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
    fetchRegistry('2019-12-05')
  }
  useEffect(() => {
    fetchGetAllUsers()
  }, [fetchGetAllUsers])
  useEffect(() => {
    fetchRegistry('2019-12-05')
  }, [])
  return(
    <>
      <Header title={t('GroupList')}/>
      <RegistryTabs 
        users={users}
        weekType={weekType}
        changeWeek={changeWeek}
        schedule={schedule}
        getRegistry={getRegistry}
        registry={registry}
        
      />
     {/*  <GroupListTable 
        users={users}
        weekType={weekType}
        changeWeek={changeWeek}
        schedule={schedule}
        getRegistry={getRegistry}
        getSubjects={getSubjects}
        subjects={subjects}
        registry={registry}
        /> */}
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
      loading: state.loading,
      users: state.users,
      schedule: state.schedule,
      registry: state.registry
    }
  }else return {state}
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(GroupList));
import React, { useEffect } from 'react'
import './groupList.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'
import GroupListTable from '../../Components/GroupListTable'
import { withJournalService } from '../../hoc';
import {fetchGetAllUsers, fetchLoaderOn, fetchLoaderOff, fetchSchedule, fetchRegistry} from '../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import RegistryTabs from '../../Components/RegistryTabs'
import moment from 'moment'
function GroupList(props:any){
  const { t } = useTranslation()
  const {fetchGetAllUsers, users, user, fetchRegistry, registry, language} = props
  let activeComponent = null

  useEffect(() => {
    fetchGetAllUsers()
  }, [fetchGetAllUsers])
  useEffect(() => {
    fetchRegistry(moment().format('YYYY-MM-DD'))
  }, [fetchRegistry])

  if(user && user.role === "MONITOR"){
    activeComponent = 
    <RegistryTabs 
      users={users}
      registry={registry}
      role={user.role}
      exportToExcel={(dateFrom:any, dateTo:any) => props.journalService.exportToExcel(dateFrom, dateTo, language)}
    />
  }else if(user && user.role === 'ADMIN'){
    activeComponent = <RegistryTabs
                        users={users}
                        role={user.role}
                        exportToExcel={(dateFrom:any, dateTo:any) => props.journalService.exportToExcel(dateFrom, dateTo, language)}
                      />
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
      registry: state.registry,
      language: state.language
    }
  }else return {state}
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(GroupList));
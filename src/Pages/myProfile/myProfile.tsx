import React, {useEffect} from 'react'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'
import MyProfileContent from '../../Components/MyProfileContent'
import { withJournalService } from '../../hoc';
import {fetchGetUser} from '../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import UserAbsent from '../../Components/UserAbsent'

const MyProfile = ({user, language, fetchGetUser}: {user:any, language: string, fetchGetUser:any}) => {
  const { t } = useTranslation()
  useEffect(() => {
    fetchGetUser()
  }, [language])
  return (
    <>
      <Header title={t('MyProfile')}/>
      <MyProfileContent
        user={user}
        yourName={t('YourName')}
        yourUsername={t('YourUsername')}
        yourStatus={t('YourStatus')}    
      />
      <UserAbsent />
    </>
  )
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const {journalService} = ownProps;
  return bindActionCreators({
    fetchGetUser: fetchGetUser(journalService)
  }, dispatch)
}
const mapStateToProps = ({user, language}:{user:any, language: string}) => {
  return {user, language}
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(MyProfile))

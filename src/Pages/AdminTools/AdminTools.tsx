import React from 'react'
import './adminTools.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'
import EditMemberList from '../../Components/EditMemberList'
function AdminTools(){
  const { t } = useTranslation()
  return(
    <>
      <Header title={t('AdminTools')} />
      <EditMemberList />  
    </>
  )
}

export default AdminTools
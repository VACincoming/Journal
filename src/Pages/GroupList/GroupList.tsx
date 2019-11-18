import React from 'react'
import './groupList.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'

function GroupList(){
  const { t } = useTranslation()
  return(
    <Header title={t('GroupList')}/>
  )
}

export default GroupList;
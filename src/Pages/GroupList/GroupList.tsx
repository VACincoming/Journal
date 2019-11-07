import React from 'react'
import './groupList.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'

function GroupList(props:any){
  const { t } = useTranslation()
  const pages = [t('MainPage'), t('GroupList'), t('Shedule') ]
  return(
    <Header title={t('GroupList')} pages={pages}/>
  )
}

export default GroupList;
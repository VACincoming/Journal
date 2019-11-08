import React from 'react'
import './shedule.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'
import SearchField from '../../Components/SearchField'
import SheduleTable from '../../Components/SheduleTable'
function Shedule(props:any){
  const { t } = useTranslation()
  return(
    <div className="sheduleWrapper">
      <Header title={t('Shedule')}/>
      <SearchField />
      <SheduleTable />
    </div>
  )
}

export default Shedule;
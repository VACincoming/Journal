import React from 'react'
import Header from '../../Components/Header'
import './main.css'
import { useTranslation } from 'react-i18next'

function Main(props:any){
  const { t } = useTranslation()
 
  return(
    <React.Fragment>
      <Header title={t('MainPage')}/>
      <h1>Main</h1>
    </React.Fragment>
  )
}

export default Main
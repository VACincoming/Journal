import React from 'react'
import Header from '../../Components/Header'
import './main.css'
import { useTranslation } from 'react-i18next'
import MainPageContent from '../../Components/MainPageContent'
function Main(props:any){
  const { t } = useTranslation()
 
  return(
    <React.Fragment>
      <Header title={t('MainPage')}/>
      <MainPageContent text={t('Text')}/>
    </React.Fragment>
  )
}

export default Main
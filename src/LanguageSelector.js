import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { t, i18n } = useTranslation()
  console.log(i18n)
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div onChange={changeLanguage}>
      <input type="radio" value="en" name="language" defaultChecked /> EN
      <input type="radio" value="ua" name="language"/> UA
    </div>
  )
}

export default LanguageSelector
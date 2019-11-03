import React from 'react'
import { useTranslation } from 'react-i18next'

const Hello = () => {
  const { t, i18n } = useTranslation()

  return (
    <div>
      {t('title.part1')}
    </div>
  )
}

export default Hello
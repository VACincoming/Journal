import React, { Suspense } from 'react'
import './App.css'
import './i18n'
import Hello from './Hello'
import ThankYou from './ThankYou'
import LanguageSelector from './LanguageSelector'
import LangSwitcher from './Components/LangSwitcher'
const App = () => {
    return (
      <div>
        <Suspense fallback={null}>
          <LanguageSelector />
          <LangSwitcher />
          <Hello />
          <ThankYou />
        </Suspense>
      </div>
    )
}

export default App

import React from 'react'

export interface AppContextInterface{
  value?:any
}
const {
  Provider: JournalServiceProvider,
  Consumer: JournalServiceConsumer
} = React.createContext<AppContextInterface | null>(null);

export {
  JournalServiceProvider,
  JournalServiceConsumer
}
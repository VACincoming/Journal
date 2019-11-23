import React from 'react'
import {JournalServiceConsumer} from '../journal-service-context'
const withJournalService = () => (Wrapped:any) => {
  return(props:any) => {
    return(
      <JournalServiceConsumer>
        {
          (journalService) => {
            return(
              <Wrapped {...props}
              journalService={journalService} />)
          }
        }
      </JournalServiceConsumer>
    )
  }
}
export default withJournalService;
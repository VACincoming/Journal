import React from 'react'
import './groupListTable.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Button'


function GroupListTable(props:any){
  const {weekType, changeWeek, users, schedule} = props
  return (
    <>
      <div>
        <Button variant="contained" color="primary" onClick={()=>changeWeek()}>
         <p> {weekType} WEEK</p>
        </Button>
        <>
        {
          users && users.map((el:any) => {
            if(el.roles.filter((el:any) => el === 'STUDENT').length > 0){
              return(
                <p key={el.id}>{el.firstName}</p>
              )
            }
          })
        }
        </>
        {/* {
          schedule && schedule.map((el:any) => {
            return(
              <p>{el}</p>
            )
          })
        } */}
      </div>
    </>
  )
}

export default GroupListTable
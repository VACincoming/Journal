import React from 'react'
import './scheduleTable.css'
import Grid from '@material-ui/core/Grid'
function ScheduleTable(props:any){
  const {day, pairs} = props
  return(
      <Grid item xl={2} lg={2} md={3} sm={4} xs={6} className='scheduleTableWrapper'>
          {day}
          <table>
            <tbody>
              {
                pairs.map((el:any, index:number) => {
                  return(
                    <tr key={el.order}>
                      <td>{el.order}</td>
                      <td>{el.name}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
      </Grid>
  )
}

export default ScheduleTable

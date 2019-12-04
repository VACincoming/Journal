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
              <tr key={pairs.dayOfWeek}>
                <th>{pairs.dayOfWeek}</th>
              </tr>
                {
                  pairs .subjects.map((el:any) => {
                    return(
                    <tr key={el.index}>
                      <td>{el.subject}</td>
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

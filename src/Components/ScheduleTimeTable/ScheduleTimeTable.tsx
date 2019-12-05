import React from 'react'
import "./scheduleTimeTable.css"
import Grid from '@material-ui/core/Grid'

const ScheduleTimeTable: React.FC<any> = (props) =>{
  const {scheduleTime} = props
  return(
    <Grid item xl={2} lg={2} md={3} sm={4} xs={6} className='scheduleTableWrapper'>
      Time
      <table>
        <tbody>
          {
            scheduleTime && scheduleTime.map((el:any) => {
              return(
                <tr key={el.id}>
                  <td>{el.beginning} - {el.end}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </Grid>
  )
}

export default ScheduleTimeTable


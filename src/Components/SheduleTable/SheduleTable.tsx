import React from 'react'
import './sheduleTable.css'
import Grid from '@material-ui/core/Grid'
function SheduleTable(props:any){
  const {day, pairs} = props
  return(
      <Grid item xs={2}>
        <div className='sheduleTableWrapper'>
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
        </div>
      </Grid>
  )
}

export default SheduleTable

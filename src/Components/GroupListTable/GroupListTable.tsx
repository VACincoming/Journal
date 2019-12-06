import 'date-fns';
import React from 'react'
import './groupListTable.css'
import Calendar from '../Calendar'
import SubjectSelect from '../SubjectSelect'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
const GroupListTable: React.FC<any> = (props) =>{
  const {users, getRegistry, getSubjects, subjects} = props
  return (
    <>
      <Grid container justify='center' alignItems='center' direction='column'>
        <Grid container item xl={6} lg={6} md={10} sm={12} xs={12} justify='space-around' alignItems='center' className='groupToolWrapper'>
          <Calendar />
          <Button variant="contained" color="primary" className='ApplyBtn' onClick={getRegistry}>Apply</Button>
        </Grid>
          <Grid item xs={10} className='tableWrapper'>
            <table>
              <tbody>
                <tr>
                  <th>STUDENTS LIST</th>
                  <th>Present</th>
                  <th>Apsent</th>
                </tr>
              {
                users && users.filter((user:any) => user.role === 'STUDENT')
                .map((user:any) => {
                  return(
                    <tr key={user.id}>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>+</td>
                        <td><input type='checkbox'/></td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>
        </Grid>
      </Grid>
    </>
  )
}

export default GroupListTable
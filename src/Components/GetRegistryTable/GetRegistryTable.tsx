import React from 'react'
import './getRegistryTable.css'
import Grid from '@material-ui/core/Grid'

export default function GetRegistryTable(props:any){
  const {registry, subjectId} = props
  return(
    <Grid container justify='center' alignItems='center' direction='column' >
        <Grid item xs={12} className='tableWrapper'>
          <table>
            <tbody>
              <tr>
                <th>STUDENTS LIST</th>
                {
                  registry && registry.subjects.length > 0 && registry.subjects.filter((el:any) => el.subject.id === subjectId)
                    .map((el:any) => {
                      return(
                        <th key={el.subject.id}>{el.subject.name}</th>
                      )
                    })
                }
              </tr>
            {
              registry && registry.subjects.length > 0 && registry.subjects.filter((el:any) => el.subject.id === subjectId)
                .map((el:any) => {
                  return(
                    el.users.map((user:any) => {
                      return(
                        <tr key={user.id}>
                          <td>{user.firstName} {user.lastName}</td>
                          <td>{user.isPresent === true ? <p style={{color: "#228477"}}>Present</p> :<p style={{color: "#ff5722"}}>Absent</p>}</td>
                        </tr>
                      )
                    })
                  )
                })
            }
            </tbody>
          </table>
        </Grid>
      </Grid>
  )
}
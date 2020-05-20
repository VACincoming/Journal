import React from 'react'
import './getRegistryTable.css'
import Grid from '@material-ui/core/Grid'
import {useTranslation} from "react-i18next";

export default function GetRegistryTable(props:any){
  const { t } = useTranslation();
  const {registry, subjectId} = props
  return(
    <Grid container justify='center' alignItems='center' direction='column' >
        <Grid item xs={12} className='tableWrapper'>
          <table>
            <tbody>
              <tr>
                <th>{t('StudentsList')}</th>
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
                          <td>{user.isPresent === true ? <p style={{color: "#228477"}}>{t('Present')}</p> :<p style={{color: "#ff5722"}}>{t('Absent')}</p>}</td>
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
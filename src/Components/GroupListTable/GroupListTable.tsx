import 'date-fns';
import React from 'react'
import './groupListTable.css'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'


const GroupListTable: React.FC<any> = (props) =>{
  const {t} = useTranslation()
  const {users} = props
  return (
    <>
      <Grid container justify='center' alignItems='center' direction='column'>
        <Grid item xs={10} className='tableWrapper'>
          <table>
            <tbody>
              <tr>
                <th>№</th>
                <th>{t('StudentsList')}</th>
                <th>{t("Mail")}</th>
              </tr>
            {
              users && users.filter((user:any) => user.role === 'STUDENT' || user.role === 'MONITOR')
              .map((user:any, index:any) => {
                return(
                  <tr key={user.id}>
                      <td>{++index}</td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
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
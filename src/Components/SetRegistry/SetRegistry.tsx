import React, {useEffect, useState} from 'react'
import './setRegistry.css'
import SubjectSelect from '../SubjectSelect'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { bindActionCreators } from 'redux'
import { withJournalService } from '../../hoc';
import {fetchGetAllUsers, fetchSubjects} from '../../actions'
import {connect} from 'react-redux'
function SetRegistry(props:any){
  const {subjects, users, fetchGetAllUsers, fetchSubjects} = props
  const [registry, setRegistry] = useState([])
  const [subjectId, setSubjectId] = useState(null)
  const [allData, setAllData] = useState({})
  const changeSubjectId = (id:any) => {
    setSubjectId(id)
  }
  const getStructure = () => {
    let structure: any = users && users.filter((user:any) => user.role === 'STUDENT' || user.role === 'MONITOR')
      .map((user:any) => ({
        present: true, 
        userId: user.id
      })
    )
    console.log(structure, props)
    setRegistry(structure)
  }
  useEffect(()=> {
      fetchGetAllUsers()
      fetchSubjects()
  }, [])
  return(
    <>
      <Grid container justify='center' alignItems='center' direction='column'>
        <SubjectSelect subjects={subjects} changeSubjectId={(id:any)=>changeSubjectId(id)}/>
        <Grid item xs={10} className='tableWrapper'>
            <table>
              <tbody>
                <tr>
                  <th>STUDENTS LIST</th>
                  <th>Absent</th>
                </tr>
              {
                users && users.filter((user:any) => user.role === 'STUDENT' || user.role === 'MONITOR')
                .map((user:any) => {
                  return(
                    <tr key={user.id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td><input type='checkbox' onChange={getStructure}/></td>
                    </tr>
                    )
                  })
                }
              </tbody>
          </table>
        </Grid>
        <Button variant="contained" color="primary" className='sentBtn' onClick={()=>console.log(registry)}>SEND</Button>
      </Grid>
    </>
  )
}
const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const {journalService} = ownProps;
  return bindActionCreators({
    fetchGetAllUsers:fetchGetAllUsers(journalService),
    fetchSubjects: fetchSubjects(journalService),
  }, dispatch)
}
const mapStateToProps = (state:any) => {
  return{
    subjects: state.subjects,
    users: state.users
  }
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(SetRegistry))
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
    setRegistry(structure)
  }
  const setStructure = (event: any, id: any) => {
    let a:any = registry.find((obj:any) => obj.userId === id)
    console.log(registry, id)
    console.log(a)
    console.log(typeof a)
    //if(typeof a === Array)
    a!.present = !event.target.checked
    let oldStructure:any = registry;
    oldStructure.forEach((el:any, index:number) => {
      if(el.userId === id) oldStructure.splice(index, 1)
    })
    console.log(oldStructure)
    console.log(registry)
    setRegistry(oldStructure)
    console.log(registry)
  }
  /*
    1) Checkbox onChange() - find object by id and change isPresent (true | false)
    2) Find in state object with this id and delete it
    3) set new Object in new state
  */
  useEffect(() => {
    (async function fetchData(){
      await fetchGetAllUsers()
      await fetchSubjects()
    })();
  }, [])
  useEffect(() => {
    getStructure()
  }, [users])
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
                      <td><input type='checkbox' onChange={(e) => setStructure(e, user.id)}/></td>
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
import React, {useEffect, useState} from 'react'
import './setRegistry.css'
import SubjectSelect from '../SubjectSelect'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { bindActionCreators } from 'redux'
import { withJournalService } from '../../hoc';
import {fetchGetAllUsers, fetchSubjects} from '../../actions'
import {connect} from 'react-redux'
import { useTranslation } from 'react-i18next'

function SetRegistry(props:any){
  const {t} = useTranslation()
  const {subjects, users, fetchGetAllUsers, fetchSubjects, journalService} = props
  const [registry, setRegistry] = useState([])
  const [subjectId, setSubjectId] = useState(null)
  const [isSubjectSelect, setIsSubjectSelect] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
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
    let filterRegistry:any = registry.find((obj:any) => obj.userId === id)
    filterRegistry!.present = !event.target.checked
    let oldStructure:any = registry;
    oldStructure.forEach((el:any, index:number) => {
      if(el.userId === id) oldStructure.splice(index, 1)
    })
    oldStructure.push(filterRegistry)
    setRegistry(oldStructure)
  }
  const setAllData = async() => {
    if(subjectId === null){
      setIsSubjectSelect(false)
      setIsSuccess(false)
    }else{
      setIsSubjectSelect(true)
      setIsSuccess(true)
      let allData = {
        registry,
        subjectId
      } 
      journalService.setRegistry(allData)
    }
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
      <Grid container justify='center' alignItems='center' direction='column' >
        <SubjectSelect subjects={subjects} changeSubjectId={(id:any)=>changeSubjectId(id)} subjectId={subjectId}/>
        <Grid item xs={10} className='tableWrapper'>
            <table>
              <tbody>
                <tr>
                  <th>{t("StudentsList")}</th>
                  <th>{t("Absent")}</th>
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
        <Button variant="contained" color="primary" className='sentBtn' onClick={setAllData}>{t("Send")}</Button>
              { isSubjectSelect  ? null : <h3 style={{"color": "#c70000f2"}}>{t("SetRegistryError")}</h3>}
        { isSuccess ? <h3>{t("Success")}</h3> : null}
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
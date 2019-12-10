import React, {useEffect, useState} from 'react'
import './getRegistry.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Calendar from '../Calendar'
import { bindActionCreators } from 'redux'
import { withJournalService } from '../../hoc';
import {fetchRegistry} from '../../actions'
import {connect} from 'react-redux'
import moment from 'moment'
import SubjectSelect from '../SubjectSelect'

function GetRegistry(props:any){
  const {journalService, fetchRegistry, registry} = props
  const [subjectsArray, setSubjectsArray] = useState([])
  const [subjectId, setSubjectId] = useState(null)
  const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM-DD'));

  let subjects:any = []
  const getRegistry = () => {
    journalService.getRegistry('2019-12-08')
  }
  const getSubjects = () => {
    subjects = registry && registry.subjects.length && registry.subjects.map((el:any) => {
      return(
        el.subject
      )
    })
    setSubjectsArray(subjects)
  }
  const changeSubjectId = (id:any) => {
    setSubjectId(id)
  }
  const changeDate = (date:any) => {
    let currentDate = moment(date).format('YYYY-MM-DD') 
    setSelectedDate(currentDate);
    setSubjectId(null)
  }
  useEffect(() => {
    (async function fetchData(){
     fetchRegistry(selectedDate)
    })()
    }, [selectedDate])
  useEffect(() => {
    getSubjects()
  }, [registry, selectedDate]) 


  return(
    <>
    <Grid container justify='center' alignItems='center'>
      <Calendar selectedDate={selectedDate} changeDate={(date:any) => changeDate(date)}/>
      <SubjectSelect subjects={subjectsArray} changeSubjectId={(id:any)=>changeSubjectId(id)}/>
    </Grid>
    { subjectId === null ? null :
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
                          <td>{user.isPresent === true ? <p>+</p> :<p>-</p>}</td>
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
    }
    </>
  )
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const {journalService} = ownProps;
  return bindActionCreators({
    fetchRegistry: fetchRegistry(journalService)
  }, dispatch)
}
const mapStateToProps = (state:any) => {
  return{
    registry: state.registry,
  }
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(GetRegistry))


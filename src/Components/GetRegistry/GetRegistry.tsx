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
import GetRegistryTable from '../GetRegistryTable'

function GetRegistry(props:any){
  const {fetchRegistry, registry} = props
  const [subjectsArray, setSubjectsArray] = useState([])
  const [subjectId, setSubjectId] = useState(null)
  const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [isVisible, setIsVisible] = useState(false)
  const [isError, setIsError] = useState(false)
  let activeElement = null;
  let subjects:any = []
  const getSubjects = () => {
    subjects = registry && registry.subjects && registry.subjects.length && registry.subjects.map((el:any) => {
      return(
        el.subject
      )
    })
    setSubjectsArray(subjects)
  }
  const changeSubjectId = (id:any) => {
    setSubjectId(id)
    setIsError(false)
    setIsVisible(false)
  }
  const changeDate = (date:any) => {
    let currentDate = moment(date).format('YYYY-MM-DD') 
    setSelectedDate(currentDate);
    setIsVisible(false)
    setSubjectId(null)
    setSubjectsArray([])
  }
  const onApply = () => {
    if(subjectId !== null){
      setIsVisible(true)
      setIsError(false)
    }else {
      setIsVisible(false)
      setIsError(true)
    }
  }
  if(isVisible){
    activeElement = <GetRegistryTable registry={registry} subjectId={subjectId}/>
  }
  if(isError){
    activeElement = <h3>Choose subject!!!</h3>
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
    <Grid container justify='center' alignItems='center' style={{marginTop: '30px'}}>
      <Calendar selectedDate={selectedDate} changeDate={(date:any) => changeDate(date)}/>
      <SubjectSelect subjects={subjectsArray} changeSubjectId={(id:any)=>changeSubjectId(id)}/>
      <Button variant='contained' color='primary' onClick={onApply} className='ApplyBtn'>APPLY</Button>
    </Grid>
    <Grid container justify='center' alignItems='center'>
      {activeElement}
    </Grid>
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


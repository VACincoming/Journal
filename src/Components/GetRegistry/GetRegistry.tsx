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
import {IRegistry} from '../../interfaces/Interfaces'
interface IGetRegistry{
  fetchRegistry: any,
  registry: any
}

const GetRegistry:React.FC<IGetRegistry> = ({fetchRegistry, registry}) => {
  const [subjectsArray, setSubjectsArray] = useState([])
  const [subjectId, setSubjectId] = useState(null)
  const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [isVisible, setIsVisible] = useState(false)
  const [isError, setIsError] = useState(false)
  let mainContent = null;
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
  const changeDate = (date:string) => {
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
    activeElement = 
      <Grid container justify='center' alignItems='center'>
        <GetRegistryTable registry={registry} subjectId={subjectId}/>
      </Grid>
  }
  if(isError){
    activeElement = 
      <Grid container justify='center' alignItems='center'>
        <h3>Choose subject!!!</h3>
      </Grid>
  }
  useEffect(() => {
    (async function fetchData(){
     fetchRegistry(selectedDate)
    })()
    }, [selectedDate])
  useEffect(() => {
    getSubjects()
  }, [registry, selectedDate]) 

  if(subjectsArray && subjectsArray.length > 0){
    mainContent = 
    <Grid container justify='center' alignItems='center' style={{marginTop: '30px'}}>
      <Calendar selectedDate={selectedDate} changeDate={(date:any) => changeDate(date)}/>
      <SubjectSelect subjects={subjectsArray} changeSubjectId={(id:any)=>changeSubjectId(id)}/>
      <Button variant='contained' color='primary' onClick={onApply} className='ApplyBtn'>APPLY</Button>
    </Grid>
  }else {
    mainContent = 
    <Grid container direction='column' justify='center' alignItems='center' style={{marginTop: '30px'}}>
      <Calendar selectedDate={selectedDate} changeDate={(date:any) => changeDate(date)}/>
      <h3 style={{marginLeft: '20px', marginRight: '20px'}}>No subjects on this date</h3>
    </Grid>
  }

  return(
    <>
      {mainContent}
      {activeElement}
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


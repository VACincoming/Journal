import React, {useState ,useEffect} from 'react'
import './schedule.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'
import ScheduleTable from '../../Components/ScheduleTable'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withJournalService } from '../../hoc'
import {connect} from 'react-redux'
import {fetchSchedule, fetchScheduleTime} from '../../actions'
import { bindActionCreators } from 'redux'
import ScheduleTimeTable from '../../Components/ScheduleTimeTable'
import Spinner from '../../Components/Spinner'
function Schedule(props:any){
  const { t } = useTranslation()
  const [weekType, setWeekType] = useState('ODD')
  const [loading, setLoading] = useState(false)
  const {fetchSchedule,  fetchScheduleTime, schedule, scheduleTime} = props
  async function changeWeek(){
    setLoading(true)
    if(weekType === 'ODD') {
      setWeekType('EVEN')
      await fetchSchedule(weekType)
      setLoading(false)
      return
    }
    else {
      setWeekType('ODD')
      await fetchSchedule(weekType)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSchedule(weekType)
  },[fetchSchedule])
  useEffect(() => {
    fetchScheduleTime()
  }, [fetchScheduleTime])
  
  return(
    <div className="sheduleWrapper">
      <Header title={t('Shedule')}/>
      { loading ? <Spinner/> :
      <>
      <Grid container justify='center' direction='row' alignItems='center' className='buttonContainer'>
        <Grid >
          <Button 
            className='changeWeekBtn'
            onClick={changeWeek}
            >
            {weekType} WEEK
          </Button>
          <Button 
            className='changeGroupBtn'
            >
            KI-161
          </Button>
        </Grid>
      </Grid>
      <Grid container justify='center' direction='row' alignItems='center' className='tableContainer'>
        {
          schedule && schedule.map((el:any) => {
            return(
              <ScheduleTable key={el.dayOfWeek} pairs={el}/>
            )
          })
        }
        <ScheduleTimeTable scheduleTime={scheduleTime}/>
      </Grid>
        </>
          }
    </div>
  )
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const { journalService } = ownProps
  return bindActionCreators({
    fetchSchedule: fetchSchedule(journalService),
    fetchScheduleTime: fetchScheduleTime(journalService)
  }, dispatch)
}
const mapStateToProps = (state:any) => {
  if(state){
    return{
      schedule: state.schedule,
      scheduleTime: state.scheduleTime
    }
  }
  return {state}
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(Schedule))
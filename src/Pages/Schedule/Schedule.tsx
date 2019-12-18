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
function Schedule(props:any){
  const { t } = useTranslation()
  const [weekType, setWeekType] = useState('ODD')
  const {fetchSchedule,  fetchScheduleTime, schedule, scheduleTime} = props
  let buttonText = null
  async function changeWeek(){
    if(weekType === 'ODD') {
      setWeekType('EVEN')
      await fetchSchedule('EVEN')
      return
    }
    if(weekType === 'EVEN') {
      await setWeekType('ODD')
      await fetchSchedule('ODD')
    }
  }
  useEffect(() => {
    fetchSchedule(weekType)
  },[])
  useEffect(() => {
    fetchScheduleTime()
  }, [fetchScheduleTime])
  if(weekType === 'ODD'){
    buttonText = <span> {t('Odd')}</span>
  }else if(weekType === 'EVEN'){
    buttonText = <span> {t('Even')}</span>
  }
  return(
    <div className="sheduleWrapper">
      <Header title={t('Sсhedule')}/>
      <Grid container justify='center' direction='row' alignItems='center' className='buttonContainer'>
        <Grid >
          <Button 
            className='changeWeekBtn'
            onClick={changeWeek}
            >
            {buttonText}
          </Button>
          <Button 
            className='changeGroupBtn'
            disabled={true}
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
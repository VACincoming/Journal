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
  const data = [
    {
      "day": "Monday",
      "pairs": [
        {"name":null, "order": 1},
        {"name":'TPP miheeeeed alexandr vladimirovich 1-311', "order": 2},
        {"name":'History', "order": 3},
        {"name":'Chemistry', "order": 4},
        {"name":null, "order": 5}
      ],
    },
    {
      "day": "Tuesday",
      "pairs":[
        {"name": null, "order": 1},
        {"name": 'TPP', "order": 2},
        {"name": null, "order": 3},
        {"name": 'Chemistry', "order": 4 },
        {"name": null, "order": 5}
      ]
    },
    {
      "day": "Wednesday",
      "pairs":[
        {"name":null, "order": 1},
        {"name":'TPP', "order": 2},
        {"name":'History', "order": 3},
        {"name":'Chemistry', "order": 4},
        {"name":null, "order": 5}
      ]
    },
    {
      "day": "Thursday",
      "pairs":[
        {"name": null, "order": 1},
        {"name": 'TPP', "order": 2},
        {"name": null, "order": 3},
        {"name": 'Chemistry', "order": 4 },
        {"name": null, "order": 5}
      ],
    },
    {
      "day": "Friday",
      "pairs":[
        {"name":null, "order": 1},
        {"name":'TPP', "order": 2},
        {"name":'History', "order": 3},
        {"name":'Chemistry', "order": 4},
        {"name":null, "order": 5}
      ]
    }
  ]
  const scheduleTime = [
    {"id": 1, "data": "08:00 - 09:20"},
    {"id": 2, "data": "09:00 - 10:20"},
    {"id": 3, "data": "10:00 - 11:20"},
    {"id": 4, "data": "11:00 - 12:20"},
    {"id": 5, "data": "12:00 - 13:20"}
  ]
  const {schedule, fetchSchedule, fetchScheduleTime} = props
  const changeWeek = () => {
    if(weekType === 'ODD') setWeekType('EVEN')
    else setWeekType('ODD')
  }
  useEffect(() => {
    fetchSchedule(weekType)
  },[fetchSchedule, weekType])
  useEffect(() => {
    fetchScheduleTime()
  }, [fetchScheduleTime])
  
  return(
    <div className="sheduleWrapper">
      <Header title={t('Shedule')}/>
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
          data && data.map((el:any) => {
            return(
              <ScheduleTable key={el.day} day={el.day} pairs={el.pairs}/>
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
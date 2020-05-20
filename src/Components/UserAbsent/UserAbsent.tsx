import React from 'react'
import './userAbsent.css'
import Calendar from '../Calendar'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const UserAbsent = () => {
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(moment().format('YYYY-MM-DD'));
  const [selectedDateTo, setSelectedDateTo] = React.useState(moment().format('YYYY-MM-DD'));

  const changeDateFrom = (date:string) => {
    let currentDate = moment(date).format('YYYY-MM-DD') 
    setSelectedDateFrom(currentDate);
  }

  const changeDateTo = (date:string) => {
    let currentDate = moment(date).format('YYYY-MM-DD') 
    setSelectedDateTo(currentDate);
  }

  return (
    <Grid container item xs={12} justify="center" style={{marginTop: "5%"}}>
      <Grid container item xs={5} justify="space-between">
        <Calendar selectedDate={selectedDateFrom} changeDate={(date:any) => changeDateFrom(date)}/>
        <Calendar selectedDate={selectedDateTo} changeDate={(date:any) => changeDateTo(date)}/>
        <Button variant='contained' color='primary'>Get Absents</Button>
      </Grid>
    </Grid>
  )
}

export default UserAbsent;
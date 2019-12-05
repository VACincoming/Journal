import React from 'react'
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import './calendar.css'
import { KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
const Calendar: React.FC = () => {

  const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM-DD'));
  const handleDateChange = (date:any)=> {
    let currentDate = moment(date).format('YYYY-MM-DD') 
    setSelectedDate(currentDate);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="With keyboard"
        format="MM/DD/YYYY"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={(date:any) => handleDateChange(date)}
      />
    </MuiPickersUtilsProvider>
  )
}

export default Calendar
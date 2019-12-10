import React from 'react'
import MomentUtils from '@date-io/moment';
import moment from 'moment'
import './calendar.css'
import { KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const Calendar: React.FC<any> = (props) => {
  const {selectedDate, changeDate} = props
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="With keyboard"
        format="DD/MM/YYYY"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={(date:any) => changeDate(date)}
      />
    </MuiPickersUtilsProvider>
  )
}

export default Calendar
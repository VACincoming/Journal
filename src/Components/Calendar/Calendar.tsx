import React from 'react'
import MomentUtils from '@date-io/moment';
import './calendar.css'
import { KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

interface ICalendar{
  selectedDate: string,
  changeDate: (date:string | null | Date) => void
}

const Calendar: React.FC<ICalendar> = ({selectedDate, changeDate}) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="Calendar"
        format="DD/MM/YYYY"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={(date:any) => changeDate(date)}
      />
    </MuiPickersUtilsProvider>
  )
}

export default Calendar
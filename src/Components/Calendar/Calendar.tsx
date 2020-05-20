import React from 'react'
import MomentUtils from '@date-io/moment';
import './calendar.css'
import { KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {useTranslation} from "react-i18next";

interface ICalendar{
  selectedDate: string,
  changeDate: (date:string | null | Date) => void
}

const Calendar: React.FC<ICalendar> = ({selectedDate, changeDate}) => {
    const { t } = useTranslation();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label={t('Calendar')}
        format="DD/MM/YYYY"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={(date:any) => changeDate(date)}
      />
    </MuiPickersUtilsProvider>
  )
}

export default Calendar
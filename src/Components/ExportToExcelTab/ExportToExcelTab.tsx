import 'date-fns';
import moment from 'moment';
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudUpload';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import './exportToExcelTab.css'
const ExportToExcelTab = (props:any) => {
  const {exportToExcel} = props;
  const [firstSelectedDate, setFirstSelectedDate] = useState(moment().subtract(7, 'days').calendar());
  const [secondSelectedDate, setSecondSelectedDate] = useState(moment().format('MM-DD-YYYY'));
  const handleFirstDateChange = (date:any) => {
    setFirstSelectedDate(date);
  };
  const handleSecondDateChange = (date:any) => {
    setSecondSelectedDate(date);
  };
  return (
    <>
      <Grid container direction="row" justify="center">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
        className="wrapperExport"
        item
        xs={6}
      >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={firstSelectedDate}
                onChange={handleFirstDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline2"
                label="Date picker inline"
                value={secondSelectedDate}
                onChange={handleSecondDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
          </MuiPickersUtilsProvider>
          <Button
            variant="contained"
            color="default"
            style={{marginBottom: "12px"}}
            startIcon={<CloudDownloadIcon />}
            onClick={() => exportToExcel(moment(firstSelectedDate).format('YYYY-MM-DD'), moment(secondSelectedDate).format('YYYY-MM-DD'))}
          >
          Export
        </Button>
      </Grid>
    </Grid>
  </>
  )
}

export default ExportToExcelTab
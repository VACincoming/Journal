import MomentUtils from '@date-io/moment';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
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
  const [isRangeTrue, setIsRangeTrue] = useState(true);
  useEffect(() => {
    if(moment(firstSelectedDate).isAfter(secondSelectedDate)) setIsRangeTrue(false);
    else setIsRangeTrue(true);
  }, [firstSelectedDate, secondSelectedDate])
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
          alignItems="center"
          className="wrapperExport"
          item
          xs={12} sm={12} lg={8} xl={6}
        >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              label="Date From"
              format="DD/MM/YYYY"
              value={firstSelectedDate}
              InputAdornmentProps={{ position: "start" }}
              onChange={handleFirstDateChange}
            />
            <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              label="Date To"
              format="DD/MM/YYYY"
              value={secondSelectedDate}
              InputAdornmentProps={{ position: "start" }}
              onChange={handleSecondDateChange}
            />
          </MuiPickersUtilsProvider>
          <Button
            variant="contained"
            color="default"
            startIcon={<CloudDownloadIcon />}
            disabled={!isRangeTrue}
            onClick={() => console.log(isRangeTrue)}
            //onClick={() => exportToExcel(moment(firstSelectedDate).format('YYYY-MM-DD'), moment(secondSelectedDate).format('YYYY-MM-DD'))}
          >
          Export
        </Button>
      </Grid>
    </Grid>
  </>
  )
}

export default ExportToExcelTab
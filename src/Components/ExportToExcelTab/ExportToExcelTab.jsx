import React, { useState } from 'react'
import { DatePicker } from "@material-ui/pickers";
import './exportToExcelTab.css'
const ExportToExcelTab = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  return(
    <>
      <DatePicker
        disableFuture
        openTo="year"
        format="dd/MM/yyyy"
        label="Date from"
        views={["year", "month", "date"]}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </>
  )
}

export default ExportToExcelTab
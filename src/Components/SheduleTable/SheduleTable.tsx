import React from 'react'
import './sheduleTable.css'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

function SheduleTable(props:any){
  const classes = useStyles();
  return(
    <table>
      <tr>
        <th style={{textAlign: 'center'}}>
          Shedule
        </th>
      </tr>
      <tr>
        <tr>
          <td>
            Monday
          </td>
          <tr>
            <td>
              1
            </td>
            <td>
              <p>TPP <br/> zador 1-319</p>
            </td>
            <td>
              Programing stas 1-222
            </td>
          </tr>
          <tr>
            <td>
              2
            </td>
            <td>
              <p>TPP <br/> zador 1-319</p>
            </td>
            <td>
              Programing stas 1-222
            </td>
          </tr>
          <tr>
            <td>
              3
            </td>
            <td>
              <p>TPP <br/> zador 1-319</p>
            </td>
            <td>
              Programing stas 1-222
            </td>
          </tr>
          <tr>
            <td>
              4
            </td>
            <td>
              <p>TPP <br/> zador 1-319</p>
            </td>
            <td>
              Programing stas 1-222
            </td>
          </tr>
        </tr>
      </tr>
    </table>
  )
}

export default SheduleTable

import React from 'react'
import './shedule.css'
import Header from '../../Components/Header'
import { useTranslation } from 'react-i18next'
import SheduleTable from '../../Components/SheduleTable'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withJournalService } from '../../hoc'
import {connect} from 'react-redux'
function Shedule(props:any){
  const { t } = useTranslation()
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
  async function getShedule(){
    try{
      await props.journalService.getShedule('ODD')
    }
    catch(err){
      console.log(err)
    }
  }
  return(
    <div className="sheduleWrapper">
      <Header title={t('Shedule')}/>
      <Grid container justify='center' direction='row' alignItems='center' className='buttonContainer'>
        <Grid >
          <Button 
            className='changeWeekBtn'
            onClick={getShedule}
            >
            EVEN WEEK
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
          data.map((el:any) => {
            return(
              <SheduleTable key={el.day} day={el.day} pairs={el.pairs}/>
            )
          })
        }
      </Grid>
    </div>
  )
}

const mapStateToProps = (state:any) => {
  if(state){
    return{shedule: state.shedule}
  }
  return {state}
}

export default withJournalService()(
  connect(mapStateToProps)(Shedule))
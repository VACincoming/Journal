import React, {useEffect} from 'react'
import './getRegistry.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Calendar from '../Calendar'
import { bindActionCreators } from 'redux'
import { withJournalService } from '../../hoc';
import {fetchRegistry} from '../../actions'
import {connect} from 'react-redux'
import moment from 'moment'

function GetRegistry(props:any){
  const {journalService, fetchRegistry, registry} = props

  const getRegistry = () => {
    journalService.getRegistry('2019-12-08').then((res:any) => console.log(res))
  }
  const onApply = () => {
    console.log(registry)
  }
  useEffect(() => {
    (async function fetchData(){
     fetchRegistry(moment().format("YYYY-MM-DD"))
    })()
    }, [])



  return(
    <>
      <Button onClick={onApply}>check</Button>
      <Grid container justify='center' alignItems='center' direction='column' >
        <Grid item xs={12} className='tableWrapper'>
          <table>
            <tbody>
              <tr>
                <th>STUDENTS LIST</th>
                {
                  registry && registry.subjects.length > 0 && registry.subjects.map((el:any) => {
                    return(
                      <th>{el.subject.name}</th>
                    )
                  })
                }
              </tr>
              {
                registry && registry.subjects.length > 0 && registry.subjects.map((el:any) => {
                  return(
                    el.users.map((user:any) => {
                      return(
                        <tr>
                          <td>{user.firstName} {user.lastName}</td>
                          <td>{user.isPresent === true ? <p>+</p> :<p>-</p>}</td>
                        </tr>
                      )
                    })
                  )
                })
              }
            </tbody>
          </table>
        </Grid>
      </Grid>
    </>
  )
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  const {journalService} = ownProps;
  return bindActionCreators({
    fetchRegistry: fetchRegistry(journalService)
  }, dispatch)
}
const mapStateToProps = (state:any) => {
  return{
    registry: state.registry,
  }
}

export default withJournalService()(
  connect(mapStateToProps, mapDispatchToProps)(GetRegistry))


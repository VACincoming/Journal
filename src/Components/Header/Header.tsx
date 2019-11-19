import React from 'react'
import './header.css'
import LangSwitcher from '../LangSwitcher'
import LeftSideMenu from '../LeftSideMenu'
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import {useHistory} from 'react-router-dom'
import { withJournalService } from '../../hoc';
import {fetchUserRequest} from '../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
const useStyles = makeStyles({
  orangeAvatar: {
    margin: 10,
    padding: 22,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },

});

function Header(props:any){
  const classes = useStyles();
  const {title, pages, fetchUserRequest} = props
  let history = useHistory();
  function logOut(){
    fetchUserRequest()
    history.push("/")
  }
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);
  return(
    <div className='headerWrapper'>
      <LeftSideMenu pages={pages}/>
      <h1 style={{marginLeft: '40px'}}>{title}</h1>
      <div className='rightHeaderWrapper'>
        <Avatar className={classes.orangeAvatar}>AN</Avatar>
        <LangSwitcher />
        <Icon className="fas fa-power-off pointer" onClick={logOut}/>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return bindActionCreators({
    fetchUserRequest: fetchUserRequest()
  }, dispatch)
}
/* const mapStateToProps = ({user}:{user:any}) => {
  return {user}
} */

export default withJournalService()(
  connect(null, mapDispatchToProps)(Header))

import React, {useState} from 'react'
import './leftSideMenu.css'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu'
import { useTranslation } from 'react-i18next'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { withJournalService } from '../../hoc'

function LeftSideMenu(props:any) {
  const { t } = useTranslation()
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer = (side:any, open:any) => (event:any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };
  const sideList = (side:any) => (
    <div
      className='list'
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
          <div>
            <Link to='/main'>
              <ListItem button className='listItem'>
                <ListItemText primary={t('MainPage')}/>
              </ListItem>
            </Link>
            <Divider />
          </div>
          <div>
            <Link to='/groupList'>
              <ListItem button className='listItem'>
                <ListItemText primary={t('GroupList')}/>
              </ListItem>
            </Link>
            <Divider />
          </div>
          <div>
            <Link to='/schedule'>
              <ListItem button className='listItem'>
                <ListItemText primary={t('Sсhedule')}/>
              </ListItem>
            </Link>
            <Divider />
          </div>
          { props.user && props.user.role && props.user.role === "ADMIN" &&
            <div>
              <Link to='/adminTools'>
                <ListItem button className='listItem'>
                  <ListItemText primary={t('AdminTools')}/>
                </ListItem>
              </Link>
              <Divider />
            </div>
            }
      </List>
    </div>
  );

  return (
    <div>
      <MenuIcon className='menuIcon' onClick={toggleDrawer('left', true)}/>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state:any) => {
  if(state){
    return {user: state.user}
  }
  return {state};
}

export default withJournalService()(
  connect(mapStateToProps)(LeftSideMenu))
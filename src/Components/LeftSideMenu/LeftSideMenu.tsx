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

export default function LeftSideMenu(props:any) {
  const { t } = useTranslation()
  const pages = [{link:'/main', text: t('MainPage')}, {link:'/groupList',text: t('GroupList')}, {link:'/shedule', text:t('Shedule')}, {link: '/adminTools', text: t('AdminTools')}]
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
        {pages.map((el:any, index:any) => (
          <div key={el.text}>
            <Link to={el.link}>
            <ListItem button className='listItem'>
              <ListItemText primary={el.text}/>
            </ListItem>
            </Link>
            <Divider key={el.text} />
          </div>
        ))}
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

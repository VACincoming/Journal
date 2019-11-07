import React, {useState} from 'react'
import './leftSideMenu.css'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu'


export default function LeftSideMenu(props:any) {
  const {pages} = props
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
        {pages.map((text:any, index:any) => (
          <div key={text}>
            <ListItem button className='listItem'>
              <ListItemText primary={text}/>
            </ListItem>
            <Divider key={text} />
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

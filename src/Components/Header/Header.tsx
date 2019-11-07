import React from 'react'
import './header.css'
import LangSwitcher from '../LangSwitcher'
import LeftSideMenu from '../LeftSideMenu'
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

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
  const {title, pages} = props
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
        <Icon className="fas fa-power-off"/>
      </div>
    </div>
  )
}

export default Header;

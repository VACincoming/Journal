import React from 'react'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles({
  orangeAvatar: {
    margin: 10,
    padding: 42,
    fontSize: 42,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },

});

const MyProfileContent = (props:any) => {
  const {user, yourName, yourUsername, yourStatus} = props;
  const classes = useStyles();
  return (
    <Grid 
      container
      item
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Avatar className={classes.orangeAvatar}>{user && user.firstName[0] + user.lastName[0]}</Avatar>
      <Grid container alignItems="center" direction="column">
        <Grid
          container
          item
          xs={9} sm={6} md={4} lg={3} xl={2}
          direction="row"
          justify="space-between"  
        >
          <h3> {yourName}: </h3>
          <h3> {user.firstName} {user.lastName}</h3>
        </Grid>
        <Grid
          container
          item
          xs={9} sm={6} md={4} lg={3} xl={2}
          direction="row"
          justify="space-between"  
        >
          <h3> {yourUsername}: </h3>
          <h3> {user.username} </h3>
        </Grid>
        <Grid
          container
          item
          xs={9} sm={6} md={4} lg={3} xl={2}
          direction="row"
          justify="space-between"  
        >
          <h3> {yourStatus}: </h3>
          <h3> {user.role}</h3>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MyProfileContent;
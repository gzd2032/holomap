import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  sidebar: {
      backgroundColor: 'rgb(18, 49, 78)',
      width: 300,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  sidebarActive: {
    color: '#FFA500',
  },
  buttons: {
    margin: theme.spacing(2, 0),
    width: '95%',
  }
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <Button 
        variant="contained" 
        color="primary"
        className={classes.buttons}
        component={NavLink}
        fullWidth
        exact to='/'
        activeClassName={classes.sidebarActive}
      >
          Home
      </Button>
      <Button 
        variant="contained" 
        color="primary"
        className={classes.buttons}
        component={NavLink}
        fullWidth
        to='/create-utc'
        activeClassName={classes.sidebarActive}
      >
          Create UTC
      </Button>
      <Button 
        variant="contained" 
        color="primary"
        className={classes.buttons}
        component={NavLink}
        fullWidth
        to = '/create-location'
        activeClassName={classes.sidebarActive}
      >
          Create Location
      </Button>
    </div>
  )
}

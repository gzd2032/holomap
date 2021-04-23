import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  sidebar: {
      backgroundColor: 'rgb(18, 49, 78)',
      width: '20%',
      minWidth: '260px'
  },
  sidebarActive: {
    color: 'rgb(5, 64, 143)',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    padding: '1em',
    "& a": {
      color: 'white',
      textDecoration: 'none',
      width: '100%',
      height: '100%',
    },
    "& a:hover": {
      color: 'orange'
    },
  },   
  buttons: {
    margin: '1em',
  }
});

export default function Sidebar() {
  const classes = useStyles();
 return (
  <div className={classes.sidebar}>
    <nav className={classes.nav}>
      <Button 
        variant="contained" 
        color="primary"
        className={classes.buttons}
      >
        <NavLink exact to="/" activeClassName={classes.sidebarActive}>
          Home
        </NavLink>
      </Button>
      <Button 
        variant="contained" 
        color="primary"
        className={classes.buttons}
      >
        <NavLink to="/create-utc" activeClassName={classes.sidebarActive}>
          Create UTC
        </NavLink>
      </Button>
      <Button 
        variant="contained" 
        color="primary"
        className={classes.buttons}
      >
        <NavLink to="/create-location" activeClassName={classes.sidebarActive}>
          Create Location
        </NavLink>
      </Button>
    </nav>
  </div>
 )
}

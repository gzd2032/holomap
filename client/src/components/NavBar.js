import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Searchbox from './Searchbox'
import logo from './logo.svg';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: 'black',
    padding: theme.spacing(2)
  },
  icon: {
    height: 45,
    width: 45,
    margin: theme.spacing(0, 2),
  },
  logoname: {
    flexGrow: 1,
    fontFamily: 'Orbitron'
  }
}));


export default function NavBar() {
  const classes = useStyles();
  const showSearch = useLocation().pathname === '/';
 return (
  <AppBar position='relative'>
    <Toolbar className={classes.toolbar}>
    <img src={logo} className={classes.icon} alt="holomap" />
    <Typography variant='h4' className={classes.logoname} >
      Holomap
    </Typography>
      {
      showSearch && <Searchbox />
      }     
     </Toolbar>
  </AppBar>
 )
}

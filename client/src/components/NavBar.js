import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Searchbox from './Searchbox'
import logo from './logo.svg';

const useStyles = makeStyles({
  contents: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1em',
    alignContent: 'center',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: '.5em',
  },
  icon: {
    height: 45,
    width: 45,
    margin: '0 .6em',
  }
});


export default function NavBar() {
  const classes = useStyles();
  const showSearch = useLocation().pathname === '/';
 return (
  <AppBar position="static" className="nav-bar">
    <div className={classes.contents}>
     <div className={classes.logo}>
      <img src={logo} className={classes.icon} alt="holomap" />
      <h1 className={classes.logoHeader}>Holomap</h1>
     </div>
       {
        showSearch && <Searchbox />
       }
     </div>
  </AppBar>
 )
}

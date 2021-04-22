import AppBar from '@material-ui/core/AppBar';
import { useLocation } from 'react-router-dom';
import Searchbox from './Searchbox'
import logo from './logo.svg';


import './css/NavBar.css'

export default function NavBar() {
  const showSearch = useLocation().pathname === '/';
 return (
  <AppBar position="static" className="nav-bar">
    <div className="nav-bar-contents">
     <div className="logo-area">
      <img src={logo} className="logo-icon" alt="holomap" />
      <h1>Holomap</h1>
     </div>
       {
        showSearch && <Searchbox />
       }
     </div>
  </AppBar>
 )
}

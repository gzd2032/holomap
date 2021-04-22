import { NavLink } from 'react-router-dom';
import './css/Sidebar.css'

export default function Sidebar() {
 return (
  <div id="sidebar">
    <nav>
      <NavLink exact to="/" activeClassName="sidebar-active">Home</NavLink>
      <NavLink to="/create-utc" activeClassName="sidebar-active">Create UTC</NavLink>
      <NavLink to="/create-location" activeClassName="sidebar-active">Create Location</NavLink>
    </nav>
  </div>
 )
}

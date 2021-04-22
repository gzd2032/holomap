import { Link } from 'react-router-dom'
import React from 'react'

import './css/AllLocationsItems.css'

export default function AllLocationsItems({ location }) {
 return (
  <div className="location-entry">
    <Link className="location-link" to={`/Location/${location.id}`}>{location.name} , {location.country}</Link>
  </div>
 )
}

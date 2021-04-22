import { Link } from 'react-router-dom'
import React from 'react'

import './css/AllUTCsItems.css'

export default function AllLocationsItems({ utc }) {
 return (
  <div className="utc-entry">
    <Link className="utc-link" to={`/utcs/${utc.id}`}>{utc.unit_type_code} - {utc.category}</Link>
  </div>
 )
}

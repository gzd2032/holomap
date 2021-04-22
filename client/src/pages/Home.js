import { useContext } from 'react';
import appContext from '../state/context'
import AllLocations from './../components/AllLocations'
import AllUTCs from './../components/AllUTCs'
import {
  selectLocationsAndUTCSThatMatchSearch,
} from '../state/selectors';
import './css/Home.css';

export default function Home() {
  const { state } = useContext(appContext);

  const {
    locations,
    utcs,
  } = selectLocationsAndUTCSThatMatchSearch(state);
  return (
    <div id="homepage">
      <AllLocations locations={locations} />
      <AllUTCs utcs={utcs} />
    </div>
  );
}

import { useContext } from 'react';
import appContext from '../state/context'
import HomeContainer from './../components/HomeContainer'
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
      <HomeContainer list={locations} title={"Locations"}/>
      <HomeContainer list={utcs} title={"UTCs"}/>
    </div>
  );
}

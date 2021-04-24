import { useContext } from 'react';
import { Container, Grid } from '@material-ui/core'
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
    <Container maxWidth='lg'>
      <Grid container spacing={2} align='center' gutterBottom>
        <Grid item>
          <HomeContainer list={locations} title={"Locations"}/>
        </Grid>
        <Grid item>
          <HomeContainer list={utcs} title={"UTCs"}/>
        </Grid>
      </Grid>
    </Container>
  );
}

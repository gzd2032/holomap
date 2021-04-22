import { Route, Switch, useHistory } from 'react-router-dom';
import { useReducer, useMemo, useEffect } from 'react';
import { reducer, initialState } from './state/reducer';
import * as actions from './state/actions';
import * as api from './effects/api';

import Home from './pages/Home';
import UTC from './pages/UTC';
import Location from './pages/Location';

import Context from './state/context';
import Sidebar from './components/Sidebar'
import Footer from './components/Footer';
import './App.css';

import NavBar from './components/NavBar'

function App() {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setupContextValue = useMemo(() => ({
    state,
    dispatch,
  }), [state]);

  useEffect(() => {
    dispatch(actions.startInitialLoad());

    api.indexController().then(response =>
      dispatch(actions.finishInitialLoad(response)));
  }, []);

  const handleUTCSubmit = async (values) => {
    const savedUTC = await api.createUTC(values);
    dispatch(actions.newUtcSaved(savedUTC));
    history.push('/');
  };

  const handleUTCEdit = async (id, values) => {
    const savedUTC = await api.updateUTCById(id, values);
    dispatch(actions.newUtcSaved(savedUTC));
    history.push('/');
  };

  const handleLocationSubmit = async (values) => {
    const savedLocation = await api.createLocation(values);
    dispatch(actions.newLocationSaved(savedLocation));
    history.push('/');
  };

  const handleLocationEdit = async (id, values) => {
    const savedLocation = await api.updateLocationById(id, values);
    dispatch(actions.newLocationSaved(savedLocation));
    history.push('/');
  };

  return (
    <Context.Provider value={setupContextValue}>
      <NavBar />
      <main>
        <Sidebar />
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/create-utc"
            render={props => (
              <UTC {...props}
                onSubmit={handleUTCSubmit}
              />
            )}
          />
          <Route
            exact
            path="/create-location"
            render={props => (
              <Location {...props}
                onSubmit={handleLocationSubmit}
              />
            )}
          />
          <Route
            exact
            path="/utcs/:id"
            render={props => (
              <UTC
                {...props}
                onEdit={handleUTCEdit}
              />
            )}
          />
          <Route
            exact
            path="/locations/:id"
            render={props => (
              <Location
                {...props}
                onEdit={handleLocationEdit}
              />
            )}
          />
        </Switch>
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;

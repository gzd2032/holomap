import { useContext, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './css/Location.css';
import Context from '../state/context';
import { selectLocationById } from '../state/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    margin: '3em',
    color: 'black'
  },
  content: {
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function EditLocationForm({ onSubmit }) {
  const { state } = useContext(Context);
  const { id } = useParams();
  const initialLocation = selectLocationById(id, state);

  if (initialLocation && Array.isArray(initialLocation.coordinates)) {
    console.log(initialLocation)
    initialLocation.coordinates = initialLocation.coordinates.join(',');
  }

  const [location, setLocation] = useState(selectLocationById(id, state));

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit(location.id, {
      name: location.name,
      country: location.country,
      coordinates: location.coordinates,
    });
  };

  const handleChange = (evt) => {
    setLocation({
      ...location,
      [evt.target.name]: evt.target.value,
    });
  };

  const classes = useStyles();

  if (!location) {
    return <Redirect to="/" />;
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content} >
        <h1>Edit Existing Location</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            required
            id="outlined-basic"
            name="name"
            label="Name"
            variant="outlined"
            value={location.name}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            name="country"
            label="Country"
            variant="outlined"
            value={location.country}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            name="coordinates"
            label="Coordinates"
            variant="outlined"
            value={location.coordinates}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

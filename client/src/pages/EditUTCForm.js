import { useContext, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './css/Location.css';
import Context from '../state/context';
import { selectUTCByID } from '../state/selectors';

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

export default function EditUTCForm({ onSubmit, utcs }) {
  const { state } = useContext(Context);
  const { id } = useParams();
  const [utc, setUTC] = useState(selectUTCByID(id, state));

  const handleSubmit = (evt) => {
    evt.preventDefault();
        
    onSubmit(utc.id, {
      unit_type_code: utc.unitTypeCode,
      category: utc.category,
      nomenclature: utc.nomenclature,
      description: utc.description,
    });
  };

  const handleChange = (evt) => {
    setUTC({
      ...utc,
      [evt.target.name]: evt.target.value,
    });
  };

  const classes = useStyles();

  if (!utc) {
    return <Redirect to="/" />;
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content} >
        <h1>Edit Existing Unit Type Code</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            required
            id="outlined-basic"
            name="unit_type_code"
            label="Unit Type Code"
            variant="outlined"
            value={utc.unit_type_code}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            name="category"
            label="Category"
            variant="outlined"
            value={utc.category}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            name="nomenclature"
            label="Nomenclature"
            variant="outlined"
            value={utc.nomenclature}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            name="description"
            label="Description"
            variant="outlined"
            value={utc.description}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

import { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './css/Location.css';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function Location({
    onSubmit,
    initialValues,
    title = 'Create New Location',
}) {
  const formRef = useRef();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { current } = formRef;
    onSubmit({
      name:  current["name"].value,
      country: current["Country"].value,
      coordinates: current["Coordinates"].value,
    });
  }
    const classes = useStyles();

  return (
    <div>
      <article>
        <h1>{title}</h1>
        <form ref={formRef} className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            name="name"
            label="Name"
            variant="outlined"
            required
          />
          <TextField
            id="outlined-basic"
            name="Country"
            label="Country"
            variant="outlined"
            required
          />
          <TextField
            id="outlined-basic"
            name="Coordinates"
            label="Coordinates"
            variant="outlined"
            required
          />
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </form>
      </article>
    </div>
  );
}

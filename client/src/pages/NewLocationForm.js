import { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './css/Location.css';


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

export default function NewLocationForm({ onSubmit }) {
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
    <Card className={classes.root}>
      <CardContent className={classes.content} >
        <h1>Create New Location</h1>
        <form ref={formRef} className={classes.form} noValidate autoComplete="off">
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            color="primary"
            required
          />
          <TextField
            id="country"
            name="Country"
            label="Country"
            variant="outlined"
            color="primary"
            required
          />
          <TextField
            id="coordinates"
            name="Coordinates"
            label="Coordinates"
            variant="outlined"
            color="primary"
            required
          />
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

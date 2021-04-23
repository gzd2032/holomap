import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Context from '../state/context';
import { selectUTCSForLocation, selectLocationsForUTC } from '../state/selectors';
import { deleteLocationById, deleteUTCById } from '../effects/api';
import { deleteUTC, deleteLocation} from '../state/actions';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#3c52b2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#cccccc',
      color: 'orange',
    },
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '2em',
  },
  linkButton: {
    textDecoration: 'none',
    "&:hover": {
      color: 'orange',
    },
  },
  modal: {
    height: '100%',
  },
  labels: {
    fontWeight: 'bolder',
    margin: '.15em .2em',
    marginTop: '.8em',
  },
  relationshipLink: {
    textDecoration: 'none',
    '& a:hover': {
      color: 'green',
    },
  },
  paper: {
    marginTop: '10%',
    margin: 'auto auto',
    width: 400,
    minHeight: 300,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

export default function ItemWithModal({ item, type }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);
  const { name, unit_type_code } = item;
  const [open, setOpen] = useState(false);


  const relationships = (name
    ? selectUTCSForLocation(item.id, state)
    : selectLocationsForUTC(item.id, state))
      .filter(x => x && x.id);

  console.log('RELATIONSHIPS', relationships);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async ()=>  {
    const updateFunction
     = type.toLowerCase() === 'locations'
      ? deleteLocationById
      : deleteUTCById;
    
    const actionCreator = type.toLowerCase() === 'locations'
      ? deleteLocation
      : deleteUTC;
    
    const result = await updateFunction(item.id);
    console.log('DELETE RESULT', result);
    if (result.wasDeleted) {
      dispatch(actionCreator(item.id));
      return setOpen(false);
    }
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">{type.slice(0, type.length - 1)}</h2>
      <p id="simple-modal-description">
        { name && 
          <>
            <div className={classes.labels}>Name: </div><div>{item?.name}</div>
            <div className={classes.labels}>Country:</div><div> {item?.country}</div>
            <div className={classes.labels}>Coordinates:</div><div> {item?.coordinates}</div>
            <br />
            <hr />
            <h3>UTCs - {relationships.length || 0}</h3>
            {relationships.length === 0 && <p>This Location has no UTCs.</p>}

            {(relationships || []).map(utc => (
              <Link className={classes.relationshipLink} key={utc.id} to={`/utcs/${utc.id}`}>
                <p>* {utc.unit_type_code} - {utc.category}</p>
              </Link>
            ))}
            <br />
          </>
        }
        { unit_type_code && 
          <>
            <div className={classes.labels}>Unit Type Code:</div> <div>  {item?.unit_type_code}</div>
            <div className={classes.labels}>Category:</div> <div>  {item?.category}</div>
            <div className={classes.labels}>Nomencalture:</div> <div>  {item?.nomenclature}</div>
            <div className={classes.labels}>Description:</div> <div>  {item?.description}</div>
            <br />
            <hr />
            <h3>Locations - {relationships.length || 0}</h3>
            {relationships.length === 0 && <p>This UTC has no locations.</p>}
            {(relationships || []).map(location => (
              <Link className={classes.relationshipLink} key={location.id} to={`/locations/${location.id}`}>
                <p>* {location.name} - {location.country}</p>
              </Link>
            ))}
            <br />
          </>
        }
      </p>
      <div className={classes.buttons}>
        <Link 
          to={`/${type}/${item.id}`}
          className={classes.linkButton}
        >
          <Button
            variant="contained" 
            color="alternate" 
          >Edit</Button>
        </Link>
        <Button
            variant="contained" 
            color="secondary"
            onClick={handleDelete}  
          >Delete</Button>
        <Button
          variant="contained" 
          color="alternate" 
          onClick={handleClose}
        >
          Close
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        className={classes.root}
        onClick={handleOpen}
      >
        {item.id}
        { name && `)  ${item.name}, ${item.country}` }
        { unit_type_code && `)  ${item.unit_type_code} - ${item?.category}`}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

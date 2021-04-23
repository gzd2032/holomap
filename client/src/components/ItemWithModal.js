import { useState } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
  const { name, unit_type_code } = item;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">{type}</h2>
      <p id="simple-modal-description">
        { name && 
          <>
            <p>Name: {item?.name}</p>
            <p>Country: {item?.country}</p>
            <p>Coordinates: {item?.coordinates}</p>
          </>
        }
        { unit_type_code && 
          <>
            <div>Unit Type Code:  {item?.unit_type_code}</div>
            <div>Category:  {item?.category}</div>
            <div>Nomencalture:  {item?.nomenclature}</div>
            <div>Description:  {item?.description}</div>
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
          color="alternate" 
          onClick={handleClose}
        >Close</Button>
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

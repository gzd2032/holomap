import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  footer: {
    textAlign: 'center',
    marginTop: 0,
    padding: 0,
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'inherit',
  },
}));
export default function Footer() {
  const classes = useStyles();
 return (
  <Typography color="primary" className={classes.footer}>
        Copyright 2021 - 04 - Airmen Coders SDI
  </Typography>
 )
}

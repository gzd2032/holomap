import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import AllLocationsItems from './AllLocationsItems'

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    flexBasis: '40%',
    backgroundColor: 'rgb(51,51,51)',
    color: 'white',
    margin: '1em',
    overFlow: 'scroll',
    height: '60vh',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AllLocations({locations}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
       <CardHeader style={{color: 'white'}}
        title={`Location(s):  ${locations.length}`}
      />
      <CardContent style={{maxHeight: '60vh', overflow: 'auto'}} >
        {
         locations.map(location => {
           return (
            <AllLocationsItems key={location.id} location={location} />
            );
          })
        }
      </CardContent>
      {}
    </Card>
  );
}
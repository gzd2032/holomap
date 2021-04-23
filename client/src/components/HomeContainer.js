import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import HomeContainerList from './HomeContainerList';

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    flexBasis: '40%',
    backgroundColor: 'rgb(51,51,51)',
    color: 'white',
    margin: '1em',
    overFlow: 'scroll',
    height: '80vh',
    '& .MuiInputBase-root': {
      color: 'white',
      fontFamily: 'Orbitron',

    },
  },
  header: {
    fontFamily: 'inherit',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 4,
  },
});

export default function HomeContainer({list, title}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
       <CardHeader
        className={classes.header}
        title={`${title}:  ${list?.length || 0}`}
      />
      <CardContent>
        <HomeContainerList  list={list} type={title}/>
      </CardContent>
    </Card>
  );
}
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import HomeContainerList from './HomeContainerList';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgb(51,51,51)',
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
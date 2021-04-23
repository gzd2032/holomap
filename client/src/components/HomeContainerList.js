import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ItemWithModal from './ItemWithModal'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HomeContainerList({list, type}) {
  const classes = useStyles();

  return (
    <List className={classes.root}  style={{maxHeight: '65vh', overflow: 'auto'}} >
     {list.map(item => (
      <ListItem>
        <ItemWithModal key={item.id} item={item} type={type}/>
      </ListItem>
      ))}      
    </List>
  );
}

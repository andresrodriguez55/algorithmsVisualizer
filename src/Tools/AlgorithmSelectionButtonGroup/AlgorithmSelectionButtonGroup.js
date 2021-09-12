import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      justifyContent: 'center'
    },
  },
}));

export default function BasicButtonGroup({setSortType, information}) 
{
  const classes = useStyles();

  const algorithms=Object.keys(information);

  return (
    <div className={classes.root} style={{width: "100%"}}>
      <ButtonGroup color="black" aria-label="outlined button group" variant="text" 
      style={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
        {
          algorithms.map(name=>{
            return (
              <Button onClick={()=>{setSortType(name)}}>{name}</Button>
            );
          })
        }
      </ButtonGroup>
    </div>
  );
}
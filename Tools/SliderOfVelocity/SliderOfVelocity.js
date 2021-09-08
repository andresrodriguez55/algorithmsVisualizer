import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({

  margin: {
    height: "100%",
  },
}));

const marks = [
  {
    value: 0.5,
    label: '0.5',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 1.5,
    label: '1.5',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 2.5,
    label: '2.5',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 3.5,
    label: '3.5',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider({setValue}) 
{
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" align="center" style={{marginBottom:"-5px"}} gutterBottom>
        Velocity
      </Typography>
      <Slider
        min={0.5}
        max={3.5}
        defaultValue={1}
        getAriaValueText={valuetext}
        setValue={valuetext}
        aria-labelledby="discrete-slider"
        step={.5}
        marks
        valueLabelDisplay="auto"
        onChange={(event, newValue)=>{setValue(newValue);}}
      />
    </div>
  );
}
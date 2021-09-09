import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({

  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 100,
    label: '100',
  },
  {
    value: 150,
    label: '150',
  },
  {
    value: 200,
    label: '200',
  },
  {
    value: 250,
    label: '250',
  },
  {
    value: 300,
    label: '300',
  },
];

function valuetext(value) {
  return `${value}`;
}

function getSketchScreenHeight()
{
  return document.getElementById("sketchScreen").clientHeight;
}

function getSketchScreenWidth()
{
  return document.getElementById("sketchScreen").clientWidth;
}

export default function DiscreteSlider({setValue}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" align="center" gutterBottom>
        Number Selected
      </Typography>
      <Slider
        min={100}
        max={300}
        defaultValue={100}
        getAriaValueText={valuetext}
        setValue={valuetext}
        aria-labelledby="discrete-slider-always"
        step={50}
        marks={marks}
        valueLabelDisplay="off"
        onChange={(event, newValue)=>{setValue(newValue);}}
      />
    </div>
  );
}
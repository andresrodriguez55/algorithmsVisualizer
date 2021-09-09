import Header from '../../Tools/Header/Header.js';
import "./../../Tools/PageTemplate/PageTemplate.css";
import information from "./../../Tools/InformationOfAlgorithms&Presentation/InformationSieveOfEratosthenes.js";
import { printInformation } from '../../Tools/PageTemplate/PrintExplicationOfAlgorithm';
import Slider from "./SliderOfValues.js";
import sketch from "./SketchSieveOfEratosthenes.js";
import P5Wrapper from "react-p5-wrapper";
import React, {useState} from 'react';

export default function SieveOfEratosthenes() 
{
  const [value, setValue]=useState(100);
  const [play, setPlay]=useState(false);
  
  return (
    <div>
      <Header/>
      <div className="SketchArea" >
        <h1 className="Title">Sieve of Eratosthenes</h1>
        <div className="SketchScreen" id="sketchScreen">
          <P5Wrapper sketch={sketch} number={value} play={play}/>
        </div>

        <div className="SketchButtonsArea">
          <button className="Button" onClick={()=>{setPlay(true);}}>Play</button>
          <button className="Button" onClick={()=>{setPlay(false);}}>Reset</button>
        </div>

        <div className="SliderArea">
            <Slider setValue={setValue} />
        </div>
      </div>   
    
      {printInformation(information)}
    </div>
  );
}
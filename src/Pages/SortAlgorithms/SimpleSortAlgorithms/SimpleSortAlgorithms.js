import Header from '../../../Tools/Header/Header';
import "./../../../Tools/PageTemplate/PageTemplate.css";
import information from '../../../Tools/InformationOfAlgorithms&Presentation/InformationSimpleSortAlgorithms';
import { printInformation } from '../../../Tools/PageTemplate/PrintExplicationOfAlgorithm.js';
import AlgorithmsButtons from "./../../../Tools/AlgorithmSelectionButtonGroup/AlgorithmSelectionButtonGroup";
import SliderVelocity from "./../../../Tools/SliderOfVelocity/SliderOfVelocity";

import P5Wrapper from "react-p5-wrapper";
import sketch from "./SimpleSortAlgorithmsSketch";
import React, {useState} from 'react';

export default function SimpleSortAlgorithms() 
{
  const [play, setPlay]=useState(false);
  const [sortType, setSortType]=useState("Bubble");
  const [array, setArray]=useState([3, 6, 1, 2, 9, 15, 32, 30, 29, 28, 25, 22, 21, 2]);
  const [indexChanged, setIndexChanged]=useState(-1);
  const [velocity, setVelocity]=useState(1);

  const minimumLength=3;
  const maximumLength=20;

  const info=function()
  {
    let algorithm;
    switch(sortType)
    {
      case "Bubble":
        algorithm=information.Bubble;
        break;
      
      case "Selection":
        algorithm=information.Selection;
        break;

      default:
        algorithm=information.Insertion;
    }

    return(
      printInformation(algorithm)
    );
  };
  
  return (
    <div style={{marginBottom:"30px"}}>
      <Header/>
      <div className="SketchArea" >
        <h1 className="Title">{sortType+" Sort"}</h1>
        <div className="SketchScreen" id="sketchScreen">
          <P5Wrapper sketch={sketch} 
            sortMode={sortType} 
            array={array}
            setArray={setArray}
            indexChanged={indexChanged}
            setIndexChanged={setIndexChanged} 
            play={play}
            setPlay={setPlay} 
            velocity={velocity}/>
        </div>

        <div className="SketchButtonsArea">
          <button className="Button" onClick={()=>{setPlay(true);}}>Play</button>
          <button className="Button" onClick={()=>{setPlay(false);}}>Reset</button>
        </div>

        <div className="AlgorithmSelectionArea">
          <AlgorithmsButtons setSortType={setSortType} information={information}/>
        </div>

        <div className="SliderArea">
            <SliderVelocity setValue={setVelocity} />
        </div>


        <div className="InputArrayArea">
          <table className="InputArrayTable">
            <tr className="InputArrayRow">
              {array.map( (element, index) => 
              {
                return (
                  <th contenteditable="true" id="cell" className="InputArrayRowElement">
                    <input id={"elementWithIndex"+index.toString()}
                      className="InputArrayNumber" 
                      type="number" 
                      defaultValue={element}
                      onChange={()=>{
                        array[index]=document.getElementById("elementWithIndex"+index.toString()).value;
                        setIndexChanged(index); }}/>
                  </th>
                ) 
              })} 
            </tr>
          </table>
        </div>

        <div className="PushPopButtonsArea">
          <div className="PushButtonArea">
            <button className="Button" 
              onClick={()=>{
                if(array.length<maximumLength) 
                  setArray(array.concat([0])); 
                else 
                  window.alert(`The maximum length must be ${maximumLength}!`);
              }}>Push
            </button>
          </div>

          <div className="ButtonsBetweenSpaceArea">
          </div>

          <div className="PopButtonArea">
            <button className="Button" 
              onClick={()=>{
                if(array.length>minimumLength) 
                  setArray(array.slice(0, -1)); 
                else 
                  window.alert(`The minimum length must be ${minimumLength}!`
              );}}>Pop
            </button>
          </div>
        </div>
      </div> 

      {info()}            
    </div>
  );
}
import Header from '../../Tools/Header/Header.js';
import "./../../Tools/PageTemplate/PageTemplate.css";
import information from "./../../Tools/InformationOfAlgorithms&Presentation/InformationGraphs.js";
import { printInformation } from '../../Tools/PageTemplate/PrintExplicationOfAlgorithm.js';
import Slider from "./../../Tools/SliderOfVelocity/SliderOfVelocity.js";

import P5Wrapper from "react-p5-wrapper";
import sketch from "./SketchGraphs.js";
import React, {useState} from 'react';

export default function Graphs() 
{
  const [velocity, setVelocity]=useState(1);
  const [mode, setMode]=useState(
    {type:"vertex", startID:-1, destinyID:-1, algorithm: "", pathCost: 0, displayValues:true}
  );

  const info=function()
  {
    if(mode.type=="vertex" || mode.type=="edgeFirst" || mode.type=="edgeSecond")
      return;
    
    let algorithm;
    switch(mode.type)
    {
      case "dfs":
        algorithm=information.dfs;
        break;
      
      case "bfs":
        algorithm=information.bfs;
        break;

      case "kruskal":
        algorithm=information.kruskal;
        break;

      default:
        algorithm=information.dijkstra;
    }

    return(
      printInformation(algorithm)
    );
  };

  return (
    <div style={{marginBottom: "100px"}}>
      <Header/>
      <div className="SketchArea">
        <h1 className="Title">Graphs</h1>
        <div className="SketchScreen" id="graphsSketchScreen">
          <P5Wrapper sketch={sketch} velocity={velocity} mode={mode}/>
        </div>

        <div className="SketchButtonsArea">
          <button className="Button" onClick={()=>{
            setMode({...mode, type: 'vertex'});}}>Vertex</button>

          <button className="Button" onClick={()=>{
            setMode({...mode, type: 'edgeFirst'})}}>Edge</button>

          <button className="Button" onClick={()=>{
            setMode({...mode, displayValues: !mode.displayValues})}}>Display Values</button>

          <button className="Button" onClick={()=>{
            setMode({...mode, type: "dfs", algorithm: "Deep-first search"});
          }}>DFS</button>

          <button className="Button" onClick={()=>{
            setMode({...mode, type: "bfs", algorithm: "Breadth-first search"});}}>BFS</button>
            
          <button className="Button" onClick={()=>{
            setMode({...mode, type: "dijkstra1", algorithm: "Dijkstra's algorithm"});}}>Shortest Path</button>

          <button className="Button" onClick={()=>{
            setMode({...mode, type: "kruskal", algorithm: "Kruskal's algorithm"});}}>Minimum Spanning Tree</button>
        </div>

        <div className="SliderArea">
            <Slider setValue={setVelocity} />
        </div>
      </div>
      {info()}
    </div>
  );
}
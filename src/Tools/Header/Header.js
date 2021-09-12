import './Header.css';
import Drawer from './Drawer.js';
import {useHistory} from 'react-router-dom';

export default function App() 
{
  const history=useHistory();

  return (
        <div>
            <div className="headerDiv">
            <div className="iconDrawer"> <Drawer/></div>
                <h1 className="titleText" style={{cursor: "pointer"}} onClick={()=>{history.push("/")}}>
                  ALGORITHMS VISUALIZER
                </h1>
            </div>
        </div>
  );
}
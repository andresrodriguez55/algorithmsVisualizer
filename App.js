import './App.css';
import {Switch, Route} from "react-router-dom";
import Main from './Pages/Main/Main';
import sieveOfEratosthenes from "./Pages/SieveOfEratosthenes/SieveOfEratosthenes";
import SimpleSortAlgorithms from "./Pages/SortAlgorithms/SimpleSortAlgorithms/SimpleSortAlgorithms";
import AdvancedSortAlgorithms from "./Pages/SortAlgorithms/AdvancedSortAlgorithms/AdvancedSortAlgorithms";
import Graphs from "./Pages/Graphs/Graphs";
import ScrollToTop from './Tools/ScrollToTop/ScrollToTop';
import Gcd from "./Pages/Gcd/Gcd"

export default function App() 
{
  return (
    <div>
      <ScrollToTop/>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/sieveOfEratosthenes" component={sieveOfEratosthenes}/>
        <Route exact path="/simpleSort" component={SimpleSortAlgorithms}/>
        <Route exact path="/advancedSort" component={AdvancedSortAlgorithms}/>
        <Route exact path="/graphs" component={Graphs}/>

      </Switch>
    </div>
  );
}
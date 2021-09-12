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
        <Route exact path="/SieveOfEratosthenes" component={sieveOfEratosthenes}/>
        <Route exact path="/SimpleSort" component={SimpleSortAlgorithms}/>
        <Route exact path="/AdvancedSort" component={AdvancedSortAlgorithms}/>
        <Route exact path="/Graphs" component={Graphs}/>
        <Route exact path="/ExtendedEucledianAlgorithm" component={Gcd}/>
      </Switch>
    </div>
  );
}
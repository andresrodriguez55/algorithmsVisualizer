import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Collapse from '@material-ui/core/Collapse';

import FunctionsIcon from '@material-ui/icons/Functions';
import SortIcon from '@material-ui/icons/Sort';
import TimelineIcon from '@material-ui/icons/Timeline';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GitHubIcon from '@material-ui/icons/GitHub';

import { useLocation, useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const history=useHistory();

  const [expandMath, setExpandMath]=React.useState(false);
  const [expandSort, setExpandSort]=React.useState(false);

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={()=>setExpandMath(!expandMath)}>
          <ListItemIcon><FunctionsIcon/></ListItemIcon>
          <ListItemText primary={"Mathematics"} />
          {expandMath ? <ExpandLess /> : <ExpandMore />}        
        </ListItem>

        <Collapse in={expandMath} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText inset primary="Sieve of Eratosthenes" onClick={()=>{history.push("/sieveOfEratosthenes")}}/>
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText inset primary="Linear Algebra" onClick={()=>{window.open("https://andresrodriguez55.github.io/LinearAlgebraCalculator/", "_blank")}}/>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={()=>setExpandSort(!expandSort)}>
          <ListItemIcon><SortIcon/></ListItemIcon>
          <ListItemText primary={"Sort"} />
          {expandSort ? <ExpandLess /> : <ExpandMore />}   
        </ListItem>

        <Collapse in={expandSort} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={()=>{history.push("/simpleSort")}}>
              <ListItemText inset primary="Simple" />
            </ListItem>
            
            <ListItem button className={classes.nested} onClick={()=>{history.push("/advancedSort")}}>
              <ListItemText inset primary="Advanced" />
            </ListItem>
            
          </List>
        </Collapse>

        <ListItem button onClick={()=>{history.push("/graphs")}}>
          <ListItemIcon><TimelineIcon/></ListItemIcon>
          <ListItemText primary={"Graphs"} />
        </ListItem>

      </List>
      <Divider />
      <List>
        <ListItem button key={"Github"}>
          <ListItemIcon><GitHubIcon/></ListItemIcon>
          <ListItemText primary={"Github"} onClick={()=> window.open("https://github.com/andresrodriguez55?tab=repositories", "_blank")}/>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}><MenuIcon/></Button>
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)} variant="temporary" >
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

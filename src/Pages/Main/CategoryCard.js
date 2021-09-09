import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    marginTop: "30px",
    backgroundColor: "grey",
    color: "white"
  },
});

export default function ImgMediaCard({categoryName}) {
  const classes = useStyles();

  let image, subcategories;
  
  try
  {
      image=require("./../../Tools/PhotosOfCategories/"+categoryName+".png").default
  }
  catch(e)
  {
    image=require("./../../Tools/PhotosOfCategories/Default.png").default;
  }

  try
  {
    subcategories=require("./../../Tools/Subcategories Names/"+categoryName+".js").default
  }
  catch(e)
  {
    subcategories=[]
  }

  const history=useHistory();

  return (
    <Card className={classes.root} onClick={()=>{
        if(categoryName!="Linear Algebra")
          history.push(categoryName.replaceAll(" ", ""))
        else
         window.open("https://andresrodriguez55.github.io/LinearAlgebraCalculator/", "_blank") 
    }}>
      <CardActionArea>
        <div style={{height:"300"}}>
          <CardMedia
            component="img"
            width="100%"
            src={image}/>
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {categoryName}
          </Typography>

          <Typography variant="body2" color="white" component="p" variant="subheading">
            {subcategories.map((name)=>
              {
                return (
                  <Typography variant="subtitle2" color="white" component="p" variant="subheading">
                    {"• "+name+"\n"}
                    </Typography>
                );
              }
            )}
            </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}
import Header from './../../Tools/Header/Header';
import information from "../../Tools/InformationOfAlgorithms&Presentation/InformationMain";
import { printInformation } from '../../Tools/PageTemplate/PrintExplicationOfAlgorithm.js';
import CategoryCard from "./CategoryCard";

export default function Main() 
{
    const presentation=printInformation(information);
    const categories=["Graphs", "Simple Sort", "Advanced Sort", "Sieve of Eratosthenes", "Linear Algebra"];

    return(
        <div>
            <Header/>
            <div>
                {presentation}
            </div>

            <div style={{
                boxShadow:" 0 1px 3px 0 rgba(0, 0, 0, 0.938)",
                backgroundColor: "rgba(206, 206, 206, 0.116)",
                width: "80%",
                marginTop: "30px",
                padding: "10px",
                marginLeft: "auto",
                marginRight: "auto",      
                overflow: "hidden",
                marginBottom: "40px",
                }}>

                {categories.map((categoryName)=>{
                    return(
                        <CategoryCard categoryName={categoryName}/>
                    )
                })}
            </div>
        </div>
    );
}
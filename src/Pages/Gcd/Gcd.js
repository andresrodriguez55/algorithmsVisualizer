import Header from './../../Tools/Header/Header';
import information from "../../Tools/InformationOfAlgorithms&Presentation/InformationGCD&ExtendedGCD";
import { printInformation } from '../../Tools/PageTemplate/PrintExplicationOfAlgorithm.js';

export default function Gcd() 
{
    const content=printInformation(information);

    return(
        <div>
            <Header/>
            <div>
                {content}
            </div>
        </div>
    );
}
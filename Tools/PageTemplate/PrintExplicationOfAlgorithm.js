export function printInformation(algorithm)
{
    let pseudocode;

    if(typeof algorithm.pseudocode==="string")
        pseudocode=(
            <div>
                <h3 style={{fontFamily: 'Kaisei HarunoUmi', marginBottom: "-1px"}}>
                    Pseudocode
                </h3>
                <hr/>
                <span className="ExplicationPseudocodeFont" >
                    {algorithm.pseudocode}
                </span>
                <hr/>
            </div>
        );

    else if(typeof algorithm.pseudocode==="object")
            pseudocode=(
                <div>
                    <h3 style={{fontFamily: 'Kaisei HarunoUmi', marginBottom: "-1px"}}>
                        Recursive Pseudocode
                    </h3>
                    <hr/>
                    <span className="ExplicationPseudocodeFont" >
                        {algorithm.pseudocode.recursive}
                    </span>
                    <hr/>
                    <h3 style={{fontFamily: 'Kaisei HarunoUmi', marginBottom: "-1px", marginTop: "45px"}}>
                        Iterative Pseudocode
                    </h3>
                    <hr/>
                    <span className="ExplicationPseudocodeFont" >
                        {algorithm.pseudocode.iterative}
                    </span>
                    <hr/>
                </div>
            );

    else
        pseudocode=""; 

    let imageContent="";            
    let imageFileNumber=1;
    while(algorithm.hasOwnProperty("imageFileName"+imageFileNumber.toString()))
    {
        const fileName=algorithm["imageFileName"+(imageFileNumber++).toString()];
        const src=require("./../Images/"+fileName).default;
        
        imageContent=(<div>{imageContent}<image alt="" src={src} className="Image"/></div>);
        imageFileNumber++;
    }
    console.log(imageContent)
        
    const text = {__html: algorithm.information};
  
    return(
        <div className="ExplicationArea">
          <h1 className="ExplicationTitle">{algorithm.name}</h1>
          <div className="ExplicationInformationArea">
            <span className="ExplicationInformationFont" dangerouslySetInnerHTML={text} />
          </div>
          <div className="ExplicationPseudocodeArea">
            {pseudocode}
            {imageContent}
          </div>
        </div>
    );
}
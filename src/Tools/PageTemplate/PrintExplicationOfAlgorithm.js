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

    let imageAndImageExplications=<div/>;            
    let counter=1;
    while(algorithm.hasOwnProperty("imageLink"+counter.toString()))
    {
        const urlImage=algorithm["imageLink"+(counter).toString()];

        imageAndImageExplications=(<div>
            {imageAndImageExplications}
            <img alt="" src={urlImage} className="Image"/>
            {
                (algorithm.hasOwnProperty("imageExplication"+counter.toString()))?
                    <div className="ImageExplicationArea">
                        <span className="ImageExplication"
                            dangerouslySetInnerHTML={{__html: algorithm["imageExplication"+counter.toString()]}} />
                    </div>
                    :
                     ""
            }
        </div>);

        counter++;
    }
        
    const text = {__html: algorithm.information};
  
    return(
        <div className="ExplicationArea">
          <h1 className="ExplicationTitle">{algorithm.name}</h1>
          <div className="ExplicationInformationArea">
            <span className="ExplicationInformationFont" dangerouslySetInnerHTML={text} />
          </div>
          <div className="ExplicationPseudocodeArea">
            {pseudocode}
            {imageAndImageExplications}
          </div>
        </div>
    );
}
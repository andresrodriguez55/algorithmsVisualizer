export default function sketchSieveOfEratosthenes(p)
{
    let number=100; 
    let play=false;

    function beginning()
    {
        drawTable(number);
        fillTableWithNumbers(number);
    }

    p.setup=function() 
    {
        const _width=document.getElementById("sketchScreen").clientWidth;
        const _height=document.getElementById("sketchScreen").clientHeight;

        p.createCanvas(_width, _height); //window.innerWidth window.innerHeight
        beginning();
    }

    p.myCustomRedrawAccordingToNewPropsHandler=async function(props)
    {
        if(props.number!=number)
        {
            number=props.number; 
            play=false; 
            beginning();
        }    

        else if(props.play!=play)
        {    
            play=props.play;
            beginning();
            if(play)
                await drawFillSquares(number);
            play=false;
        }
    }

    p.windowResized=function() 
    {
        const _width=document.getElementById("sketchScreen").clientWidth;
        const _height=document.getElementById("sketchScreen").clientHeight;

        p.resizeCanvas(_width, _height);
        beginning();
    }

    function drawTable(number) 
    {
        p.background(0);
        p.stroke(150);
        p.strokeWeight(1);

        let x=0;
        let y=0;
        const row_number=Math.floor(number/10)+1;

        for(; x<p.width; x+=p.width/10)
            p.line(x, 0, x, p.height);

        for(; y<p.height; y+=p.height/row_number)
            p.line(0, y, p.width, y);
    }

    function fillTableWithNumbers(number)
    {
        p.stroke(0);
        p.fill(255);
        p.textSize((p.width+p.height)/86);

        let x=p.width/5;
        let y=0;
        const row_number=Math.floor(number/10)+1;
        let actual_number=2;

        for(y=0; y<=p.height; y+=p.height/row_number)
        {
            for(; x<p.width; x+=p.width/10)
            {
                p.text((actual_number).toString(), 
                    x+(p.width/24)*(1-(Math.floor(Math.log10(actual_number)))/8), 
                    y+p.height/(1.5*row_number));
                actual_number++;
            }
            x=0;
        }
    }

    function sleep(ms) 
    {
        return new Promise((resolve) => 
        {
            setTimeout(resolve, ms);
        });
    }

    async function drawFillSquares(number)
    {
        p.stroke(150);
        p.strokeWeight(1);

        let x=p.width/5;
        let y=0;
        const row_number=Math.floor(number/10)+1;
        
        let actual_number=2;
        var isPrimeArr = new Array(number+1).fill(true);

        const selectedMiliseconds=100/number;

        for(y=0; y<=p.height; y+=p.height/row_number)
        {
            for(; x<p.width; x+=p.width/10)
            { 
                await sleep(selectedMiliseconds);
                if(!play) return;

                if(isPrimeArr[actual_number])
                {
                    p.fill(0, 255, 0, 90);
                    p.rect(x, y, p.width/10, p.height/row_number);
                    p.rect(x, y, p.width/10, p.height/row_number);

                    for(let z=actual_number+1; z<=number; z++)
                    {
                        await sleep(selectedMiliseconds/5);
                        if(!play) return;

                        if (z%actual_number==0 && isPrimeArr[z])
                        {
                            isPrimeArr[z]=false;
                            p.fill(255, 0, 0, 90);
                            p.rect((p.width/10)*(z%10), (p.height/row_number)*(Math.floor(z/10)), p.width/10, p.height/row_number);
                        }
                    }
                }
                actual_number++;
            }
            x=0;
        }
    }
}
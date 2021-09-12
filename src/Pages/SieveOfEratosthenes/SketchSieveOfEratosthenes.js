export default function sketchSieveOfEratosthenes(p)
{
    let number=100; 
    let play=false;

    let screenWidth, screenHeight;

    let colorRectangles=[];

    function ColorRectangle(x, y, width, height, color)
    {
        this.xRatio=x/screenWidth;
        this.yRatio=y/screenHeight;
        this.widthRatio=width/screenWidth;
        this.heightRatio=height/screenHeight;
        this.color=color;
        

        this.drawIt=function() 
        {
            (this.color=="green")? p.fill(0, 255, 0, 90) : p.fill(255, 0, 0, 90);

            p.strokeWeight(.1);
            p.stroke("white");
            p.rect(this.xRatio*screenWidth, this.yRatio*screenHeight, 
                this.widthRatio*screenWidth, this.heightRatio*screenHeight);
        }
    }

    function updateScreenProperties()
    {
        screenWidth=document.getElementById("sketchScreen").clientWidth;
        screenHeight=document.getElementById("sketchScreen").clientHeight;
    }

    function beginning()
    {
        drawTable(number);
        fillTableWithNumbers(number);
    }

    p.setup=function() 
    {
        updateScreenProperties();
        p.createCanvas(screenWidth, screenHeight);
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
            colorRectangles=[];
            play=props.play;
            beginning();
            if(play)  
            { 
                await drawFillSquares(number); 
            }   
        }
        
    }

    p.windowResized=function() 
    {
        updateScreenProperties()
        p.resizeCanvas(screenWidth, screenHeight);
        beginning();
        colorRectangles.map(rectangle=>rectangle.drawIt())
    }

    function drawTable(number) 
    {
        p.background(0);
        p.stroke(150);
        p.strokeWeight(1);

        let x=0;
        let y=0;
        const row_number=Math.floor(number/10)+1;

        for(; x<screenWidth; x+=screenWidth/10)
            p.line(x, 0, x, screenHeight);

        for(; y<screenHeight; y+=screenHeight/row_number)
            p.line(0, y, screenWidth, y);
    }

    function fillTableWithNumbers(number)
    {
        p.stroke(0);
        p.fill(255);
        p.textSize((screenWidth+screenHeight)/86);

        let x=screenWidth/5;
        let y=0;
        const row_number=Math.floor(number/10)+1;
        let actual_number=2;

        for(y=0; y<=screenHeight; y+=screenHeight/row_number)
        {
            for(; x<screenWidth; x+=screenWidth/10)
            {
                p.text((actual_number).toString(), 
                    x+(screenWidth/24)*(1-(Math.floor(Math.log10(actual_number)))/8), 
                    y+screenHeight/(1.5*row_number));
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

        let x=screenWidth/5;
        let y=0;
        const numberOfRows=Math.floor(number/10)+1;
        
        let actual_number=2;
        var isPrimeArr = new Array(number+1).fill(true);

        const selectedMiliseconds=90/number;

        for(x=0; x<10; x++)
        {
            for(y=0; y<=numberOfRows; y++)
            { 
                if(isPrimeArr[actual_number])
                {
                    colorRectangles.push(new ColorRectangle((screenWidth/10)*(actual_number%10), (screenHeight/numberOfRows)*(Math.floor(actual_number/10)), screenWidth/10, screenHeight/numberOfRows, "green"));
                    colorRectangles[colorRectangles.length-1].drawIt();

                    for(let z=actual_number+1; z<=number; z++)
                    {
                        if (z%actual_number==0 && isPrimeArr[z])
                        {
                            isPrimeArr[z]=false;

                            colorRectangles.push(new ColorRectangle((screenWidth/10)*(z%10), (screenHeight/numberOfRows)*(Math.floor(z/10)), screenWidth/10, screenHeight/numberOfRows, "red"));
                            colorRectangles[colorRectangles.length-1].drawIt();
                        }
                        await sleep(selectedMiliseconds/5);
                        if(!play) 
                            return;
                    }
                }
                actual_number++;

                await sleep(selectedMiliseconds);
                if(!play) 
                    return;
            }
            x=0;
        }
    }
}
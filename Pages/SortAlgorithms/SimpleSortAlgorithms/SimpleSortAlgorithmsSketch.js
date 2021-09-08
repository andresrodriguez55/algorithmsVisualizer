export default function SimpleSortAlgorithmsSketch(p)
{
    let screenWidth;
    let screenHeight;

    let array=[3, 6, 1, 2, 9, 15, 32, 30, 29, 28, 25, 22, 21, 2]; //minimum := 3, maximum :=30

    let numberOfSpaces, widthOfRectangle, 
        widthOfSpace, maxElement, 
        heightConstant;

    let velocity=100;

    let sortMode="Bubble";

    let play=false;

    function updateScreenProperties()
    {
        screenWidth=document.getElementById("sketchScreen").clientWidth;
        screenHeight=document.getElementById("sketchScreen").clientHeight;
    }

    p.setup=function() 
    {
        updateScreenProperties();
        p.createCanvas(screenWidth, screenHeight);
        p.background(0);
        drawRectangles();
    }

    function findMax()
    {
        maxElement=array[0];
        for(let x=1; x<array.length; x++)
        {
            if(array[x]>maxElement)
                maxElement=array[x];
        }
    }

    function findCoordinatesAndHeightOfTriangle(elementIndex)
    {
        const xCoordinate=widthOfSpace*(elementIndex+1)+widthOfRectangle*elementIndex;
        const _height=heightConstant*array[elementIndex];
        const yCoordinate=screenHeight-_height;

        return [xCoordinate, yCoordinate, _height];
    }

    function drawRectangleWithColor(color, xCoordinate, yCoordinate, _height)
    {
        switch(color)
        {
            case "red":
                p.fill("red");
                break;
            
            case "green":
                p.fill("green");
                break;

            case "orange":
                p.fill("orange");
                break;

            case "black":
                p.fill("black");
                break;

            default: 
                p.fill("white");
        }
        p.rect(xCoordinate, yCoordinate, widthOfRectangle, _height);
        p.fill("white");
    }

    function drawRectangles()
    {
        numberOfSpaces=array.length+1;
        widthOfRectangle=screenWidth/numberOfSpaces;
        widthOfSpace=widthOfRectangle/numberOfSpaces;
        
        findMax();
        heightConstant=(screenHeight-80)/maxElement;

        p.fill(255);
        for(let x=0; x<array.length; x++)
        {
            const [xCoordinate, yCoordinate, _height]=findCoordinatesAndHeightOfTriangle(x);
            drawRectangleWithColor("white", xCoordinate, yCoordinate, _height);
        }
    }

    function sleep(ms) 
    {
        return new Promise((resolve) => 
        {
            setTimeout(resolve, ms);
        });
    }

    function updateInputCellValue(index, newValue)
    {
        try
        {
            document.getElementById("elementWithIndex"+index.toString()).value = newValue;
        }
        catch(e){}
    }

    async function bubbleSort()
    {
        let swapHapenned=true;
        while(swapHapenned)
        {
            swapHapenned=false;
            const end=array.length-1;
            for(let x=0; x<end; x++)
            {
                let [backXCoordinate, backYCoordinate, backHeight]=
                    findCoordinatesAndHeightOfTriangle(x);

                let [frontXCoordinate, frontYCoordinate, frontHeight]=
                    findCoordinatesAndHeightOfTriangle(x+1);

                drawRectangleWithColor("green", backXCoordinate, backYCoordinate, backHeight);
                drawRectangleWithColor("green", frontXCoordinate, frontYCoordinate, frontHeight);

                await sleep(velocity);
                if(!play)
                    return;

                drawRectangleWithColor("white", backXCoordinate, backYCoordinate, backHeight);
                drawRectangleWithColor("white", frontXCoordinate, frontYCoordinate, frontHeight);

                if(array[x]>array[x+1])
                {
                    drawRectangleWithColor("red", backXCoordinate, backYCoordinate, backHeight);
                    drawRectangleWithColor("red", frontXCoordinate, frontYCoordinate, frontHeight);

                    await sleep(velocity);
                    if(!play)
                        return;

                    drawRectangleWithColor("black", backXCoordinate, backYCoordinate, backHeight);
                    drawRectangleWithColor("black", frontXCoordinate, frontYCoordinate, frontHeight);

                    const temp=array[x+1];
                    array[x+1]=array[x];
                    updateInputCellValue(x+1, array[x+1]);
                    array[x]=temp;
                    updateInputCellValue(x, array[x]);
                    swapHapenned=true;

                    [backXCoordinate, backYCoordinate, backHeight]=
                        findCoordinatesAndHeightOfTriangle(x);
                    [frontXCoordinate, frontYCoordinate, frontHeight]=
                        findCoordinatesAndHeightOfTriangle(x+1);

                    drawRectangleWithColor("orange", backXCoordinate, backYCoordinate, backHeight);
                    drawRectangleWithColor("orange", frontXCoordinate, frontYCoordinate, frontHeight);  
                    
                    await sleep(velocity);
                    if(!play)
                        return;

                    drawRectangleWithColor("white", backXCoordinate, backYCoordinate, backHeight);
                    drawRectangleWithColor("white", frontXCoordinate, frontYCoordinate, frontHeight);
                }
            }
        }
    }

    async function selectionSort()
    {
        for(let x=0; x<array.length-1; x++)
        {
            let [backXCoordinate, backYCoordinate, backHeight]=
                findCoordinatesAndHeightOfTriangle(x);

            drawRectangleWithColor("green", backXCoordinate, backYCoordinate, backHeight);
            await sleep(velocity);
            if(!play)
                return;

            for(let y=x+1; y<array.length; y++)
            {
                let [frontXCoordinate, frontYCoordinate, frontHeight]=
                findCoordinatesAndHeightOfTriangle(y);

                drawRectangleWithColor("green", frontXCoordinate, frontYCoordinate, frontHeight);
                await sleep(velocity);
                if(!play)
                    return;

                if(array[y]<array[x])
                {
                    [backXCoordinate, backYCoordinate, backHeight]=
                        findCoordinatesAndHeightOfTriangle(y);
                    [frontXCoordinate, frontYCoordinate, frontHeight]=
                        findCoordinatesAndHeightOfTriangle(x);
                    
                    drawRectangleWithColor("red", backXCoordinate, backYCoordinate, backHeight);
                    drawRectangleWithColor("red", frontXCoordinate, frontYCoordinate, frontHeight);
                    await sleep(velocity);
                    if(!play)
                        return;

                    drawRectangleWithColor("black", backXCoordinate, backYCoordinate, backHeight);
                    drawRectangleWithColor("black", frontXCoordinate, frontYCoordinate, frontHeight);
                    
                    const temp=array[x];
                    array[x]=array[y];
                    updateInputCellValue(x, array[x]);
                    array[y]=temp;
                    updateInputCellValue(y, array[y]);

                    [backXCoordinate, backYCoordinate, backHeight]=
                        findCoordinatesAndHeightOfTriangle(x);
                    [frontXCoordinate, frontYCoordinate, frontHeight]=
                        findCoordinatesAndHeightOfTriangle(y);
                    
                    drawRectangleWithColor("orange", backXCoordinate, backYCoordinate, backHeight);
                    drawRectangleWithColor("orange", frontXCoordinate, frontYCoordinate, frontHeight);
                    await sleep(velocity);
                    if(!play)
                        return;
                    drawRectangleWithColor("green", backXCoordinate, backYCoordinate, backHeight);
                }
                drawRectangleWithColor("white", frontXCoordinate, frontYCoordinate, frontHeight);
            }
            drawRectangleWithColor("white", backXCoordinate, backYCoordinate, backHeight);
        }
    }

    async function insertionSort()
    {
        for (let x=1; x < array.length; x++)
        { 
            let [frontXCoordinate, frontYCoordinate, frontHeight]=
                findCoordinatesAndHeightOfTriangle(x);

            drawRectangleWithColor("green", frontXCoordinate, frontYCoordinate, frontHeight);
            await sleep(velocity);
            if(!play)
                return;

            const key = array[x]; 
            let y=x-1;

            let backXCoordinate, backYCoordinate, backHeight;
            let middleXCoordinate, middleYCoordinate, middleHeight;

            for(; array[y]>key && y>=0; y--)
            {
                [backXCoordinate, backYCoordinate, backHeight]=
                    findCoordinatesAndHeightOfTriangle(y);
                [middleXCoordinate, middleYCoordinate, middleHeight]=
                    findCoordinatesAndHeightOfTriangle(y+1);
                
                drawRectangleWithColor("red", backXCoordinate, backYCoordinate, backHeight);
                drawRectangleWithColor("red", middleXCoordinate, middleYCoordinate, middleHeight);
                await sleep(velocity);
                if(!play)
                    return;

                drawRectangleWithColor("black", backXCoordinate, backYCoordinate, backHeight);
                drawRectangleWithColor("black", middleXCoordinate, middleYCoordinate, middleHeight);
                
                array[y+1]=array[y];
                updateInputCellValue(y+1, array[y+1]);

                [backXCoordinate, backYCoordinate, backHeight]=
                    findCoordinatesAndHeightOfTriangle(y+1);
                [middleXCoordinate, middleYCoordinate, middleHeight]=
                    findCoordinatesAndHeightOfTriangle(y);
                
                drawRectangleWithColor("orange", backXCoordinate, backYCoordinate, backHeight);
                drawRectangleWithColor("orange", middleXCoordinate, middleYCoordinate, middleHeight);
                await sleep(velocity);
                if(!play)
                    return;

                drawRectangleWithColor("white", backXCoordinate, backYCoordinate, backHeight);
                drawRectangleWithColor("white", middleXCoordinate, middleYCoordinate, middleHeight);
            }

            [backXCoordinate, backYCoordinate, backHeight]=
                findCoordinatesAndHeightOfTriangle(y+1);
            drawRectangleWithColor("black", backXCoordinate, backYCoordinate, backHeight);

            array[y + 1] = key;
            updateInputCellValue(y+1, array[y+1]);
            
            [backXCoordinate, backYCoordinate, backHeight]=
                findCoordinatesAndHeightOfTriangle(y+1);
            drawRectangleWithColor("orange", backXCoordinate, backYCoordinate, backHeight);

            await sleep(velocity);
            if(!play)
                return;

            drawRectangleWithColor("white", backXCoordinate, backYCoordinate, backHeight);
        } 
    }

    async function playSort()
    {
        switch(sortMode)
        {
            case "Bubble":
                await bubbleSort();
                break;
            
            case "Insertion":
                await insertionSort();
                break;

            case "Selection":
                await selectionSort();
                break;
        }
    }

    function resetScreen()
    {
        p.fill(0);
        p.rect(0, 0, screenWidth, screenHeight);
        drawRectangles();
    }
    
    p.windowResized=function() 
    {
        updateScreenProperties();
        p.resizeCanvas(screenWidth, screenHeight);
        resetScreen();
    }

    p.myCustomRedrawAccordingToNewPropsHandler=async function(props)
    {
        if(props.sortMode!=sortMode)
        {
            sortMode=props.sortMode; 
            props.setPlay(false); 
            resetScreen();
        }    

        else if(props.array.length!=array.length)
        {
            if(props.array.length<array.length)
                array.pop();
            else
                array.push(0);

            props.setPlay(false);
            resetScreen();
        }

        else if(props.indexChanged>=0)
        {
            array[props.indexChanged]=parseInt(document.getElementById("elementWithIndex"+props.indexChanged.toString()).value);
            props.setPlay(false);
            resetScreen();
            props.setIndexChanged(-1);
        }

        else if(props.play!=play)
        {
            play=props.play;
            
            if(play)    
                await playSort();

            else
                resetScreen();
            
            props.setPlay(false);
        }

        else if(100/props.velocity!=velocity)
        {
            velocity=100/props.velocity;
        }
    }
}


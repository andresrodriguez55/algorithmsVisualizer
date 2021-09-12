export default function AdvancedSortAlgorithmsSketch(p)
{
    let screenWidth;
    let screenHeight;
    const partitionScreenRatio=2;
    let framePerSecond=30; 

    let sortMode="Merge"
    let array=[9, 1, 3, 10, 11, 1, 4, 5]; 
    let rectangleArray=[];
    let play=false;

    function updateScreenProperties()
    {
        screenWidth=document.getElementById("sketchScreen").clientWidth;
        screenHeight=document.getElementById("sketchScreen").clientHeight;
    }

    function Rectangle(elementIndex)
    {
        this.position="Up";

        this.reset=function()
        {
            this.numberOfSpaces=array.length+1;
            this.widthOfRectangle=screenWidth/this.numberOfSpaces;
            this.widthOfSpace=this.widthOfRectangle/this.numberOfSpaces;

            this.maxElement=array[0];
            for(let x=1; x<array.length; x++)
                if(array[x]>this.maxElement)
                    this.maxElement=array[x];

            this.heightConstant=(screenHeight/partitionScreenRatio-80)/this.maxElement;

            this.isThereAnyDestination=false;

            this.actualXCoordinate=this.widthOfSpace*(elementIndex+1)+this.widthOfRectangle*elementIndex;
            this.rectangleHeight=this.heightConstant*array[elementIndex];
            this.actualYCoordinate=screenHeight/partitionScreenRatio-this.rectangleHeight;
        }

        this.updateDestinyCoordinates=function(isTheDestinationBelow, destinationIndex)
        {
            this.isThereAnyDestination=true;

            this.toXCoordinate=this.widthOfSpace*(destinationIndex+1)+this.widthOfRectangle*destinationIndex;

            if(isTheDestinationBelow)
            {
                this.toYCoordinate=partitionScreenRatio*screenHeight/partitionScreenRatio-this.rectangleHeight;
                this.position="Down";
            }

            else
            {
                this.toYCoordinate=screenHeight/partitionScreenRatio-this.rectangleHeight;
                this.position="Up";
            }

            this.dx=(this.toXCoordinate-this.actualXCoordinate)/framePerSecond;
            this.dy=(this.toYCoordinate-this.actualYCoordinate)/framePerSecond;
        }

        this.display=function()
        {
            if(this.isThereAnyDestination) 
            {
                if( (this.actualYCoordinate>=this.toYCoordinate && this.position=="Down") ||
                    (this.actualYCoordinate<=this.toYCoordinate && this.position=="Up")    )
                {
                    this.isThereAnyDestination=false;
                }

                else
                {
                    this.actualXCoordinate+=this.dx;
                    this.actualYCoordinate+=this.dy;

                    p.fill("red");
                    p.rect(this.actualXCoordinate, this.actualYCoordinate, this.widthOfRectangle, this.rectangleHeight);
                }
            }

            else
            {     
                p.fill("white");
                p.rect(this.actualXCoordinate, this.actualYCoordinate, this.widthOfRectangle, this.rectangleHeight);
            }
        }
    }

    async function playSort()
    {
        switch(sortMode)
        {
            case "Quick":
                await quickSort(0, array.length);
                break;
            
            case "Merge":
                await mergeSort(0, array.length);
                break;
        }
    }

    p.setup=function() 
    {
        updateScreenProperties();
        p.createCanvas(screenWidth, screenHeight);
        resetScreen();
    }
    

    p.draw=function()
    {
        p.background(0);
        for(let x=0; x<array.length;x++)
        {
            rectangleArray[x].display();
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

    async function mergeSort(starterIndex, size)
    {
        if (size < 2)
            return;

        const half=Math.floor(size/2);

        await mergeSort(starterIndex, half);
        await mergeSort(half+starterIndex, size-half);

        let index=0, left = 0, right = half; 
        const arrayPartitionElementsOrdered = [];
        const rectangleArrayPartitionElementsOrdered=[];

        while (left<half || right<size)
        {
            if(!play)
                return;

            if (right==size || (left<half && array[starterIndex+left]<array[starterIndex+right]))
            {
                rectangleArray[starterIndex+left].updateDestinyCoordinates(true, starterIndex+index);

                rectangleArrayPartitionElementsOrdered[index]=rectangleArray[starterIndex+left];
                arrayPartitionElementsOrdered[index++]=array[starterIndex+left++]; 
            }
                
            else
            {
                rectangleArray[starterIndex+right].updateDestinyCoordinates(true, starterIndex+index);

                rectangleArrayPartitionElementsOrdered[index]=rectangleArray[starterIndex+right];
                arrayPartitionElementsOrdered[index++]=array[starterIndex+right++];
            } 

            await sleep(400);
        }

        await sleep(400);
        if(!play)
            return;

        for(let x=0; x<size; x++)
        {
            if(!play)
                return;

            array[starterIndex+x]=arrayPartitionElementsOrdered[x];
            rectangleArray[starterIndex+x]=rectangleArrayPartitionElementsOrdered[x];
            rectangleArray[starterIndex+x].updateDestinyCoordinates(false, starterIndex+x);

            updateInputCellValue(starterIndex+x, array[starterIndex+x]);

            await sleep(200);
        }       
    }

    async function quickSort(starterIndex, size)
    {
        if (size < 2)
            return;

        const randomIndex=Math.floor(Math.random()*size)+starterIndex;
        let temp;

        //real swap
        temp=array[starterIndex];
        array[starterIndex]=array[randomIndex];
        array[randomIndex]=temp;

        //visual swap
        rectangleArray[starterIndex].updateDestinyCoordinates(true, starterIndex);
        rectangleArray[randomIndex].updateDestinyCoordinates(true, randomIndex);
        await sleep(600);
        rectangleArray[starterIndex].updateDestinyCoordinates(false, randomIndex);
        rectangleArray[randomIndex].updateDestinyCoordinates(false, starterIndex);
        await sleep(500);
        temp=rectangleArray[starterIndex];
        rectangleArray[starterIndex]=rectangleArray[randomIndex];
        rectangleArray[randomIndex]=temp;
        updateInputCellValue(starterIndex, array[starterIndex]);
        updateInputCellValue(randomIndex, array[randomIndex]);

        let position=1+starterIndex;

        const endLoop=size+starterIndex;
        for(let x=(1+starterIndex); x<endLoop; x++)
        {
            if(!play)
                return;

            if(array[starterIndex]>array[x])
            {
                //real swap
                temp=array[x];
                array[x]=array[position];
                array[position]=temp;

                //visual swap
                rectangleArray[x].updateDestinyCoordinates(true, x);
                rectangleArray[position].updateDestinyCoordinates(true, position);
                await sleep(600);
                rectangleArray[x].updateDestinyCoordinates(false, position);
                rectangleArray[position].updateDestinyCoordinates(false, x);
                await sleep(400);
                temp=rectangleArray[x];
                rectangleArray[x]=rectangleArray[position];
                rectangleArray[position]=temp;
                updateInputCellValue(x, array[x]);
                updateInputCellValue(position, array[position]);

                position++;
            }
        }

        if(!play)
            return;

        //real swap
        temp=array[starterIndex];
        array[starterIndex]=array[position-1];
        array[position-1]=temp;

        //visual swap
        rectangleArray[starterIndex].updateDestinyCoordinates(true, starterIndex);
        rectangleArray[position-1].updateDestinyCoordinates(true, position-1);
        await sleep(600);
        rectangleArray[starterIndex].updateDestinyCoordinates(false, position-1);
        rectangleArray[position-1].updateDestinyCoordinates(false, starterIndex);
        await sleep(400);
        temp=rectangleArray[starterIndex];
        rectangleArray[starterIndex]=rectangleArray[position-1];
        rectangleArray[position-1]=temp;
        updateInputCellValue(starterIndex, array[starterIndex]);
        updateInputCellValue(position-1, array[position-1]);

        position-=starterIndex;
        await quickSort(starterIndex, position-1);
        await quickSort(starterIndex+position, size-position);
    }

    function resetScreen()
    {
        p.fill(0);
        p.rect(0, 0, screenWidth, screenHeight);
        play=false;

        rectangleArray=[];
        for(let x=0; x<array.length; x++)
        {
            rectangleArray.push(new Rectangle(x));
            rectangleArray[x].reset();
            updateInputCellValue(x, array[x])
        }
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
            props.setIndexChanged(-1);
            props.setPlay(false);
            resetScreen();
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
    }
}
export default function SketchGraphs(p)
{
    let screenWidth;
    let screenHeight;
    let vertexRatio;

    const vertices={}; //{... id: new Vertex(...) ...}
    let uniqueVertexID=1;
    let velocity=1;
    const mode={type:"vertex", startID:-1, destinyID:-1, algorithm: "", 
        pathCost: 0, displayValues:true, changingValue: false};

    let input, button;

    function updateScreenProperties()
    {
        screenWidth=document.getElementById("graphsSketchScreen").clientWidth;
        screenHeight=document.getElementById("graphsSketchScreen").clientHeight;
        vertexRatio=0.6*screenWidth/50 + screenHeight/25;
    }

    function notifyToUser()
    {
        p.fill("grey")
        p.stroke("grey");
        p.rect(0, 0, screenWidth, screenHeight/8);

        p.textAlign(p.CENTER);
        p.textSize((p.width+p.height)/60);
        p.strokeWeight(3);
        p.fill("white")
        p.stroke("black");

        const[x, y]=[screenWidth/2, screenHeight/20];
        switch(mode.type)
        {
            case "vertex":
                p.text("Add/Delete Vertex\nSelect.", x, y);
                break;

            case "edgeFirst":
                p.text("Add/Delete/Edit Edge\nSelect a vertex or a path value.", x, y);
                break;

            case "edgeSecond":
                p.text("Delete Edge\nSelect a second vertex.", x, y);
                break;

            case "changingValue":
                drawLoopState("off"); 
                p.fill("orange");
                p.stroke("orange");
                p.rect(0, 0, screenWidth, screenHeight/8);

                p.fill("white")
                p.stroke("black");
                p.text(`Vertex ${mode.startID} ➡ vertex ${mode.destinyID}, enter a positive value:`, x, y);

                if(!input)
                {
                    input = p.createInput();
                    button = p.createButton("");
                }

                input.size(screenWidth/8, screenHeight/35)
                input.position(3*screenWidth/8.2, screenHeight/16);
                
                button.size(screenWidth/16, screenHeight/23)
                button.position(screenWidth/2, screenHeight/16);

                let action=function()
                {
                    const value=parseInt(input.value());
                    if(!isNaN(value) && value>=0)
                    {
                        vertices[mode.startID].changeEdgeValue(mode.destinyID, value);
                        vertices[mode.destinyID].changeEdgeValue(mode.startID, value);
                    }

                    input.remove();
                    button.remove();
                    input=null;
                    button=null;
                    mode.type="edgeFirst";
                    drawLoopState("on");
                };
                button.mousePressed(action);

                break;

            case "dfs":
                p.textLeading(y);
                p.text(`${mode.algorithm}\nSelect a initial vertex.`, x, y);
                break;

            case "bfs":
                p.textLeading(y);
                p.text(`${mode.algorithm}\nSelect a initial vertex.`, x, y);
                break;

            case "dijkstra1":
                p.textLeading(y);
                p.text(`${mode.algorithm}\nSelect a initial vertex.`, x, y);
                break;

            case "dijkstra2":
                p.textLeading(y);
                p.text(`${mode.algorithm}\nSelect a destiny vertex.`, x, y);
                break;

            case "running":
                p.fill("green")
                p.stroke("green");
                p.rect(0, 0, screenWidth, screenHeight/8);

                p.fill("white")
                p.stroke("black");
                p.textLeading(y);
                p.text(`${mode.algorithm}\nrunning...`, x, y);
                break;

            case "cost":
                p.fill("green");
                p.stroke("green");
                p.rect(0, 0, screenWidth, screenHeight/8);

                p.fill("white")
                p.stroke("black");
                p.text(`Cost of path: ${mode.pathCost} `, x, y);
                break;

            case "noPath":
                p.fill("red");
                p.stroke("red");
                p.rect(0, 0, screenWidth, screenHeight/8);

                p.fill("white")
                p.stroke("black");
                p.text(`No path from vertex ${vertices[mode.startID].ID} to vertex ${vertices[mode.destinyID].ID}...`, x, y);
                break;

            case "noMst":
                p.fill("red");
                p.stroke("red");
                p.rect(0, 0, screenWidth, screenHeight/8);

                p.fill("white")
                p.stroke("black");
                p.text("The graph is disconnected...", x, y);
                break;
        }
    }

    function drawLoopState(state)
    {
        if(state=="off")
            p.noLoop();

        else
        {
            for(let ID in vertices)
                vertices[ID].color="grey";
            p.loop();
        }     
    }

    async function runAlgorithm()
    {
        if(p.isLooping())
        {
            let tempModeType=mode.type;
            mode.type="running";
            notifyToUser();
            drawLoopState("off");

            switch(mode.algorithm)
            {
                case "Deep-first search":
                    await dfs(mode.startID, mode.startID);
                    break;

                case "Breadth-first search":
                    await bfs(mode.startID);
                    break;

                case "Dijkstra's algorithm":
                    tempModeType="dijkstra1";
                    await dijkstra(mode.startID, mode.destinyID);
                    break;

                case "Kruskal's algorithm":
                    await kruskal();
                    break;
            }

            await sleep(1500);
            mode.type=tempModeType;
            notifyToUser();
            drawLoopState("on");
        }
    }

    function euclideanDistance(x1, y1, x2, y2)
    {
        return Math.round(Math.sqrt( Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2) ));
    }

    function Vertex(x, y)
    {
        this.ID=uniqueVertexID++;
        this.digitsOfID=Math.floor(Math.log10(this.ID))+1;

        this.xRatio=x/screenWidth;
        this.yRatio=y/screenHeight;

        this.color="grey";

        this.connectedIDsAndCosts={}; //{..., ID: cost, ....}

        this.displayVertex=function()
        {
            try
            {
                p.strokeWeight(2);
                p.stroke("white");
                p.fill(this.color);
                p.ellipse(this.xRatio*screenWidth, this.yRatio*screenHeight, vertexRatio, vertexRatio); 

                p.strokeWeight(2);
                p.fill("white")
                p.stroke("black");
                p.textSize((screenHeight+screenWidth)/70 - this.digitsOfID + 1);  
                p.text(this.ID, 
                    this.xRatio*screenWidth-vertexRatio/20 - (screenWidth*1/1500)*(this.digitsOfID-1), 
                    this.yRatio*screenHeight+vertexRatio/5 - 2*(this.digitsOfID-1));
            }
            catch(e){}  
        }

        this.displayEdges=function()
        {
            for(let ID in this.connectedIDsAndCosts)
            {
                try
                {  
                    const otherVertex=vertices[ID];

                    p.strokeWeight(1.5);

                    if(otherVertex.color!="orange" && this.color!="grey")
                        p.stroke(otherVertex.color);
                    else
                        p.stroke(this.color);

                    const [x1, y1]=[this.xRatio*screenWidth, this.yRatio*screenHeight];
                    const [x2, y2]=[otherVertex.xRatio*screenWidth, otherVertex.yRatio*screenHeight];
                    p.line(x1, y1, x2, y2);

                    if(mode.displayValues)
                    {    
                        p.strokeWeight(4);
                        p.fill("white")
                        p.stroke("black");
                        p.textSize((p.width+p.height)/75);
                        const distance=this.connectedIDsAndCosts[ID];
                        p.text(distance, x1+(x2-x1)/2, y1+(y2-y1)/2);
                    }

                    this.displayVertex();
                    otherVertex.displayVertex();
                }
                catch(e){}       
            }
        }

        this.changeVertexColor=async function(color)
        {
            this.color="orange";
            this.displayVertex();
            await sleep(500/velocity);
            this.color=color;
            this.displayVertex();
        }

        this.isConnectedWithThatVertex=function(ID)
        {
            return this.connectedIDsAndCosts.hasOwnProperty(ID);
        }

        this.deleteEdgeWithThatVertex=function(ID)
        {
            if(this.isConnectedWithThatVertex(ID))
            {
                delete this.connectedIDsAndCosts[ID];
                delete vertices[ID].connectedIDsAndCosts[this.ID];
            }
        }  

        this.addEdgeToVertex=function(ID) //Save in both parts for animations. 
        {
            const vertex=vertices[ID];

            const [x1, y1]=[this.xRatio*screenWidth, this.yRatio*screenHeight];
            const [x2, y2]=[vertex.xRatio*screenWidth, vertex.yRatio*screenHeight];
            const distance=Math.floor(euclideanDistance(x1, y1, x2, y2)/10);

            vertex.connectedIDsAndCosts[this.ID]= distance;
            this.connectedIDsAndCosts[ID]=distance;
        }

        this.changeEdgeColor=function(vertexID, edgeColor)
        {
            if(this.isConnectedWithThatVertex(vertexID))
            {
                const [x1, y1]=[this.xRatio*screenWidth, this.yRatio*screenHeight];
                const otherVertex=vertices[vertexID];
                const [x2, y2]=[otherVertex.xRatio*screenWidth, otherVertex.yRatio*screenHeight];
                p.strokeWeight(3);
                p.stroke(edgeColor);
                p.line(x1, y1, x2, y2);
                if(mode.displayValues)
                {    
                    p.strokeWeight(4);
                    p.fill("white");
                    p.stroke(edgeColor);
                    p.textSize((p.width+p.height)/75);
                    const distance=this.connectedIDsAndCosts[vertexID];
                    p.text(distance, x1+(x2-x1)/2, y1+(y2-y1)/2);
                }
                vertices[vertexID].displayVertex();
                this.displayVertex();
            }
        }

        this.changeEdgeValue=function(ID, value)
        {
            if(this.isConnectedWithThatVertex(ID))
            {
                this.connectedIDsAndCosts[ID]=value;
                vertices[ID].connectedIDsAndCosts[this.ID]=value;
            }
        }   
    }

    function getRandomCoordinate(axis)
    {
        if(axis=="x")
            return p.random(vertexRatio, screenWidth-vertexRatio);
        return p.random(screenHeight/8+vertexRatio, screenHeight-vertexRatio);
    }

    p.setup=function()
    {
        updateScreenProperties();
        p.createCanvas(screenWidth, screenHeight);

        vertices[1]=new Vertex(getRandomCoordinate("x"), getRandomCoordinate("y"));
        vertices[2]=new Vertex(getRandomCoordinate("x"), getRandomCoordinate("y"));
        vertices[3]=new Vertex(getRandomCoordinate("x"), getRandomCoordinate("y"));
        vertices[4]=new Vertex(getRandomCoordinate("x"), getRandomCoordinate("y"));

        vertices[1].connectedIDsAndCosts[2]=10;
        vertices[1].connectedIDsAndCosts[4]=5;
        vertices[2].connectedIDsAndCosts[1]=10;
        vertices[2].connectedIDsAndCosts[3]=3;
        vertices[2].connectedIDsAndCosts[4]=24;
        vertices[3].connectedIDsAndCosts[4]=9;
        vertices[3].connectedIDsAndCosts[2]=3;
        vertices[4].connectedIDsAndCosts[2]=24;
        vertices[4].connectedIDsAndCosts[1]=5;
        vertices[4].connectedIDsAndCosts[3]=9;
    }

    p.draw=function()
    {
        p.background(89, 89, 88);
        for(let ID in vertices)
        {
            vertices[ID].displayVertex();
            vertices[ID].displayEdges();
            notifyToUser();
        }
    }

    p.mouseClicked=async function()
    {
        if(p.isLooping())
        {    
            let clickedID=-1;

            if(mode.type.includes("edge"))
            { 
                for(let ID in vertices)
                {
                    if(euclideanDistance(p.mouseX, p.mouseY, 
                        vertices[ID].xRatio*screenWidth, vertices[ID].yRatio*screenHeight) <= vertexRatio)
                    {
                        clickedID=ID;
                        break;
                    }   
                }  

                if(clickedID>=0)
                {
                    if(mode.type=="edgeFirst")
                    {
                        mode.type="edgeSecond";
                        mode.startID=clickedID;              
                    }
                        
                    else
                    {   
                        mode.destinyID=clickedID;

                        if(vertices[mode.startID].isConnectedWithThatVertex(mode.destinyID))
                            vertices[mode.startID].deleteEdgeWithThatVertex(mode.destinyID);

                        else if(mode.startID!=mode.destinyID)
                            vertices[mode.startID].addEdgeToVertex(mode.destinyID);

                        mode.type="edgeFirst";
                    }
                }

                else if(mode.type=="edgeFirst" && mode.displayValues)
                {
                    let IDs=Object.keys(vertices);

                    for(let indexID=0; indexID<IDs.length; indexID++)
                    {
                        const ID=IDs[indexID];
                        const actualVertex=vertices[ID];
                        const neighboursInfo=vertices[ID].connectedIDsAndCosts;
                        
                        for(let neighbourID in neighboursInfo)
                        {
                            const neighbourVertex=vertices[neighbourID];

                            const [x1, y1]=[actualVertex.xRatio*screenWidth, actualVertex.yRatio*screenHeight];
                            const [x2, y2]=[neighbourVertex.xRatio*screenWidth, neighbourVertex.yRatio*screenHeight];
                            const [xText, yText]=[x1+(x2-x1)/2, y1+(y2-y1)/2];

                            if(euclideanDistance(p.mouseX, p.mouseY, xText, yText) <= vertexRatio/2)
                            {
                                mode.type="changingValue";
                                mode.startID=ID;
                                mode.destinyID=neighbourID;
                                mode.pathCost=neighboursInfo[neighbourID];
                                notifyToUser();

                                indexID=IDs.length;
                                break;
                            }      
                        }
                    }
                }
            }

            else if(mode.type=="vertex")
            {
                for(let ID in vertices)
                {
                    if(euclideanDistance(p.mouseX, p.mouseY, 
                    vertices[ID].xRatio*screenWidth, vertices[ID].yRatio*screenHeight) <= 1.5*vertexRatio)
                    {
                        clickedID=ID;
                        break;
                    }      
                }
        
                if(clickedID==-1 &&  (p.mouseY>screenHeight/8+vertexRatio && 
                    p.mouseY+vertexRatio<screenHeight)
                    && (p.mouseX>vertexRatio && p.mouseX+vertexRatio<screenWidth))
                {
                    let vertex=new Vertex(p.mouseX, p.mouseY);
                    vertices[vertex.ID]=vertex;
                }
        
                else
                {
                    mode.startID=clickedID;

                    for(let ID in vertices)
                        vertices[ID].deleteEdgeWithThatVertex(mode.startID)  
                    delete vertices[mode.startID];
                    mode.startID=-1;
                }
            } 
            
            else if(mode.type=="bfs" || mode.type=="dfs")
            {
                for(let ID in vertices)
                {
                    if(euclideanDistance(p.mouseX, p.mouseY, 
                    vertices[ID].xRatio*screenWidth, vertices[ID].yRatio*screenHeight)<=1.5*vertexRatio)
                    {
                        mode.startID=ID;
                        await runAlgorithm();
                        mode.startID=-1;
                        break;
                    } 
                }    
            }

            else if(mode.type=="dijkstra1")
            {
                for(let ID in vertices)
                {
                    if(euclideanDistance(p.mouseX, p.mouseY, 
                    vertices[ID].xRatio*screenWidth, vertices[ID].yRatio*screenHeight)<=1.5*vertexRatio)
                    {
                        mode.type="dijkstra2";
                        mode.startID=ID;
                        notifyToUser();
                        break;
                    } 
                }    
            }
            
            else if(mode.type=="dijkstra2")
            {
                for(let ID in vertices)
                {
                    if(euclideanDistance(p.mouseX, p.mouseY, 
                    vertices[ID].xRatio*screenWidth, vertices[ID].yRatio*screenHeight)<=1.5*vertexRatio)
                    {
                        mode.type="Dijkstra's algorithm2";
                        mode.destinyID=ID;
                        await runAlgorithm();
                        break;
                    } 
                } 
            }
        }
    }

    p.myCustomRedrawAccordingToNewPropsHandler=async function(props)
    {
        if(props.velocity!=velocity)
            velocity=props.velocity;  

        else if(p.isLooping())
        {
            if(props.mode.type=="kruskal")
            {
                const temp=mode.algorithm
                mode.algorithm=props.mode.algorithm;
                await runAlgorithm();
                mode.algorithm=temp;
            }

            else if(props.mode.type!=mode.type)
            {
                mode.type=props.mode.type;
                mode.algorithm=props.mode.algorithm;
            }

            else if(props.mode.displayValues!=mode.displayValues)
                mode.displayValues=props.mode.displayValues;
        }   
    }

    p.windowResized=function() 
    {
        updateScreenProperties();
        p.resizeCanvas(screenWidth, screenHeight);

        if(input)
        {
            input.size(screenWidth/8, screenHeight/35)
            input.position(3*screenWidth/8.2, screenHeight/16);

            button.size(screenWidth/16, screenHeight/23)
            button.position(screenWidth/2, screenHeight/16);
        }
    }

    function sleep(ms) 
    {
        return new Promise((resolve) => 
        {
            setTimeout(resolve, ms);
        });
    }

    async function dfs(ID, prevID)
    {
        await vertices[ID].changeVertexColor("green");

        const neighboursIDs=vertices[ID].connectedIDsAndCosts;

        for(let newID in neighboursIDs)
        {
            if(vertices[newID].color=="grey")
            {    
                vertices[ID].changeEdgeColor(newID, "green");
                await dfs(newID, ID);    
            }  
        }   

        await vertices[ID].changeVertexColor("red");  
        vertices[prevID].changeEdgeColor(ID, "red");        
    }

    function showQueueToUser(queueInfo)
    {
        p.fill("green");
        p.stroke("green");
        p.rect(0, 0, screenWidth, screenHeight/8);

        p.textAlign(p.CENTER);
        p.textSize((p.width+p.height)/60);
        const[x, y]=[screenWidth/2, screenHeight/20];
        p.strokeWeight(3);
        p.fill("white")
        p.stroke("black");
        p.text("Queue:", x, y);
        let text="";

        if(queueInfo.length==0)
            return;

        for(let x=0; x<queueInfo.length; x++)
        {
            text+=queueInfo[x][0]+"←";
        }
        text=text.substring(0, text.length-1);
        p.text(text, 3*screenWidth/8.2, screenHeight/10);
    }

    async function bfs(ID)
    {
        const queueInfo=[[ID, ID]];
        await vertices[ID].changeVertexColor("green"); 
        showQueueToUser(queueInfo);

        while(queueInfo.length!=0)
        {
            const info=queueInfo.shift();
            showQueueToUser(queueInfo);
            const [actualID, prevID]=info;

            const actualVertex=vertices[actualID];       

            const neighboursIDs=actualVertex.connectedIDsAndCosts;
            for(let neighbourID in neighboursIDs)
            {
                if(vertices[neighbourID].color=="grey")
                {
                    queueInfo.push([neighbourID, actualID]);
                    showQueueToUser(queueInfo);
                    actualVertex.changeEdgeColor(neighbourID, "green"); 
                    await vertices[neighbourID].changeVertexColor("green");  
                }
            } 

            await vertices[actualID].changeVertexColor("red");  
            vertices[actualID].changeEdgeColor(prevID, "red");
        }
    }

    function minimumForDijkstra(checkingVertices)
    {
        const IDs=Object.keys(checkingVertices);

        let [minimumDistance, resultID]=[checkingVertices[IDs[0]].distance, IDs[0]];
        for(let x=1; x<IDs.length; x++)
        {   
            const ID=IDs[x];
            if(minimumDistance>checkingVertices[ID].distance)
                [minimumDistance, resultID]=[checkingVertices[ID].distance, ID];
        }
            
        return resultID;
    }

    async function dijkstra(startID, destinyID)
    {  
        const checkingVertices={...vertices};

        for(let ID in vertices)
        {
            vertices[ID].distance=Number.MAX_VALUE;
            vertices[ID].previousID=-1;
        }
        vertices[startID].distance=0;

        while(Object.keys(checkingVertices).length!=0)
        {
            const minVertexID=minimumForDijkstra(checkingVertices);
            const minVertex=checkingVertices[minVertexID];
            delete checkingVertices[minVertexID];

            for(let neighbourID in minVertex.connectedIDsAndCosts)
            {
                const neighbourVertex=vertices[neighbourID];
                const distance=minVertex.distance+minVertex.connectedIDsAndCosts[neighbourID];

                if(distance<neighbourVertex.distance)
                {
                    neighbourVertex.distance=distance;
                    neighbourVertex.previousID=minVertex.ID;
                }
            }
        }

        if(vertices[destinyID].previousID!=-1)
        {
            mode.pathCost=vertices[destinyID].distance;
            mode.type="cost";         
            notifyToUser();

            const path=[];
            while(destinyID!=startID)
            {
                path.push(destinyID);
                destinyID=vertices[destinyID].previousID;
            }
            path.push(destinyID);

            for(let x=path.length-1; x>0; x--)
            {
                const vertex=vertices[path[x]];
                await vertex.changeVertexColor("green");
                vertex.changeEdgeColor(path[x-1], "green");
                vertex.displayVertex();
            }
            await vertices[path[0]].changeVertexColor("green");
        }
        
        else
        {
            mode.type="noPath";
            notifyToUser();
        }
    }
    
    function findParent(parents, ID)
    {
        if(parents[ID]==ID)
            return ID;
        return findParent(parents, parents[ID]);
    }

    async function kruskal() 
    {
        const outputPath=[];
        const parents={}; //{..., ID1: ID2}
        const edges=[]; //[...,[cost, ID1, ID2]]
        for (let ID in vertices)
        {
            parents[ID]=ID;
            for(let neighbourID in vertices[ID].connectedIDsAndCosts)
            {
                if(parseInt(neighbourID)<parseInt(ID))
                    continue;
                edges.push([vertices[ID].connectedIDsAndCosts[neighbourID], ID, neighbourID]);
            }
        }
        edges.sort((arr1, arr2)=>{return (arr1[0]-arr2[0])});
                
        mode.pathCost=0;
        const numberOfVertices=Object.keys(vertices).length;
        
        for(let index=0; outputPath.length!=(numberOfVertices-1) && index<edges.length; index++)
        {
            const [cost, initialID, destinyID]=edges[index];

            const sourceParent=findParent(parents, initialID);
            const destinyParent=findParent(parents, destinyID);

            if(sourceParent!=destinyParent)
            {
                parents[sourceParent]=destinyParent;
                outputPath.push([initialID, destinyID]);
                mode.pathCost=mode.pathCost+cost;
            }
        }
        
        if(outputPath.length==(numberOfVertices-1))
        {
            mode.type="cost";         
            notifyToUser();

            for(let x=0; x<numberOfVertices-1; x++)
            {
                await vertices[outputPath[x][0]].changeVertexColor("green");
                vertices[outputPath[x][0]].changeEdgeColor(outputPath[x][1], "green");
                await vertices[outputPath[x][1]].changeVertexColor("green");
            }
        }

        else
        {
            mode.type="noMst";
            notifyToUser();
        }
    }
}
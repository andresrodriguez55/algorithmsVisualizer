const information={
    dfs:
    { 
        name: "Deep-First Search",
        information: "It is an algorithm that can be implemented both recursively and iteratively with a stack data structure.\n\nThe logic of this algorithm is to start with a vertex and mark it as visited, it will continuously look at the neighbors vertices and if any of those neighbors has not been visited, it will go to that neighbor immediately, leaving the current neighbour control process waiting.For this reason, in the iterative version, a stack data structure is used, because preference is given to the last added vertex.",
        pseudocode: 
        {
            recursive: "DFS(V, ID) //V is an object, it contains vertices by IDs\n   V.ID.viewed🠔true\n   for neighbourId in V.ID.connections do\n         if V.neighbourId.viewed=false then\n            DFS(V, neighbourId)\n",
            iterative: "DFS(V, ID) //V is an object, it contains vertices by IDs\n   stack🠔[V.ID]\n   while stack.length≠0 do\n      vertex🠔stack.pop()\n      if vertex.viewed=false then\n         vertex.viewed🠔true\n         for newID in vertex.connections do\n            stack.push(V.newID)\n"
        },
    },

    bfs:
    {
        name: "Breadth-First Search",
        information: "The logic of this algorithm is to start with a vertex and mark itas visited, then the neighbors vertices will be reviewed and if any of those neighbors has not been visited, it will be added to the waitinglist (queue) and it will be marked as visited, after analyzing the neighbors the algorithm will repeat the same process with the first element of the waiting list (queue), so it will continue until the waiting list (queue) is empty.",
        pseudocode: 
        {
            recursive: "Traverse(queue)\n   if queue.length=0\n      return\n\n   vertex🠔queue.dequeue()\n   for newID in vertex.connections do\n      if V.newID.viewed=false then\n         V.newID.viewed🠔true\n         stack.enqueue(V.newID)\n   \n   Traverse(queue)\n   \nBFS(V, ID) //V is an object, it contains vertices by IDs\n   V.ID.viewed🠔true\n   queue🠔[V.ID]\n  traverse(queue)\n",
            iterative: "BFS(V, ID) //V is an object, it contains vertices by IDs\n   queue🠔[V.ID]\n   V.ID.viewed🠔true\n   while stack.length≠0 do\n      vertex🠔queue.dequeue()\n      for newID in vertex.connections do\n         if V.newID.viewed=false then\n            V.newID.viewed🠔true\n            stack.enqueue(V.newID)",
        },
    },

    dijkstra:
    {
        name: "Dijkstra's Algorithm",
        information: "The dijjkstra's algorithm starts from the desired vertex, accepting that the distance from the vertex from the beginning to all the others is infinite (meaning that there is no path) and to itself is zero, this information will be saved.\n\nIt will continuously look at all neighbors roads, if the sum of the distance from the current vertex (which is in the saved information) and the value of the road it is looking at is less than the currently known distance to that neighbor then it will update the value of the road.\n\n"+
                    "The algorithm will continue with the other vertices, always giving priority to the closest one and will not return to the vertices already seen. For this same reason, a priority queue is usually implemented for vertices.\n\n<b>The algorithm due to always going to the most optimal in order to find the most optimal solution is considered as a greedy algorithm, also for this same reason it does not work with graphs that contain negative values.</b>\n\nThe reason for this is because by always looking forthe most optimal value in each "+
                    "situation, it can make the result not be the most optimal. The algorithm could work with negative value paths if whenever an update of the stored distance information occurs, the vertices (if they are not present) are added in the priority queue again, but when doing this the algorithm would not work in cycles containing negative paths, because the algorithm would never finish.\n\nThe algorithm due to always store all distances not only, it can find the most optimal route to one end point, it can find all the most optimal "+
                    "routes to all remaining points. Due to this, the algorithm also serves to know if a graph is a connected graph or a disconnected graph.",
        pseudocode: "Dijkstra(V, ID) //V is an object, it contains vertices by IDs\n      checkingVertices🠔V.copy()\n      //only the memory references of the vertices are copied.\n         for tempID in checkingVertices do\n            V.tempID .prevID🠔NULL\n            V.tempID.distance🠔INFINITY\n         checkingVertices.ID🠔0\n\n      while checkingVertices has attributes do\n         actual🠔V.(getVertexIDWithMinDistance(checkingVertices))\n         delete checkingVertices.(actual.ID) //Deleting attribute\n\n         for neighbourID in actual.connections do\n            distance🠔actual.distance+actual.costOfEdge(neighbourID)\n            if distance<V.neighbourID.distance then\n               V.neighbourID.distance🠔distance\n               V.neighbourID.prevID🠔actual.ID\n",
    },

    kruskal:
    {
        name:"Kruskal's Algorithm",
        information:"The algorithm orders all the edges and starts selecting the smallest, as long as the chosen edges do not create cycles.\n\n<b>The algorithm always focuses on the minimum, that is why the algorithm will be considered a greedy algorithm.</b>",
        pseudocode:"findParent(parents, index)\n\tif index=parents[index] then\n\t\treturn index\n\treturn findParent(parents, parents[index])\n\nKruskal(edges, numberOfVertices) //edges=[..., [cost, initialIndex, destinyIndex]]\n\tSORT EDGES IN ASCENDING ORDER BY COSTS\n\tparents🠔[0, 1, ...., numberOfVertices-1]\n\toutput🠔[] //arraylist\n\t\n\twhile output.length≠numberOfVertices-1 do//the given graph is assumed to be connected\n\t\tedgeInfo🠔edges.dequeue()\n\t\tconst sourceParent🠔findParent(parents, edgeInfo[1])\n\t\tconst destinyParent🠔findParent(parents, edgeInfo[2])\n\t\t\n\t\tif sourceParent≠destinyParent then\n\t\t\tparents[sourceParent]🠔destinyParent\n\t\t\toutput.add(edgeInfo)"
    }
};

export default information;
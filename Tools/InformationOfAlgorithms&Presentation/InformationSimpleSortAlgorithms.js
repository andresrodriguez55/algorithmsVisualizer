const information={
    Bubble:
    {
        name: "Bubble Sort",
        information: "The algorithm goes through the entire list controlling each adjacent pair (consecutive), if two elements of a pair must change places between them, the algorithm at the end of the list scan will do the initial process again, so on until there is no change. between the elements of a pair.",
        pseudocode: "BubbleSort(arr)\n\tdidASwapOccur🠔true\n\twhile didASwapOccur=true do\n\t\tfor index🠔0 to arr.length-2 do\n\t\t\tif arr[index]>arr[index+1] then\n\t\t\t\tswapElements(arr, index, index+1)\n\t\t\t\tdidASwapOccur🠔true"
    },    

    Insertion:
    {
        name: "Insertion Sort",
        information: "The algorithm starts from the second element of the list taking it as a pivot, it will always look at the element behind it, if it is smaller than the element behind it, it will keep the pivot element in the hand, and it will make the value of the element that is behind, then it will continue backwards always looking at the adjacent pairs, at the end it will put the pivot in the index of the last value seen in the loop plus one. The algorithm will follow the same process advancing over the entire list.",
        pseudocode: "InsertionSort(arr)\n\tfor pivot🠔1 to arr.lenght-1 do\n\t\tnumber🠔arr[pivot]\n\t\tbackIndex🠔pivot-1\n\t\twhile arr[backIndex]>arr[backIndex+1] && 0≤backIndex do\n\t\t\tarr[backIndex+1]🠔arr[backIndex]\n\t\tarr[backIndex+1]🠔number"
    },
    
    Selection:
    {
        name: "Selection Sort",
        information: "The algorithm will start at the beginning of the list, keeping the index of the element and counting it as the index of the smallest element, then it will move forward controlling all the remaining elements, if any of those elements are smaller than the element of the index saved then it will be It will update the index of the smallest element, thus always keeping the smallest index in hand, finally the element of the initial index will be swapped with the index of the smallest element, the algorithm will do this process until the entire list is finished.",
        pseudocode: "SelectionSort(arr)\n\tfor index🠔0 to arr.length-2 do\n\t\tminIndex🠔index\n\t\tfor frontIndex🠔index+1 to arr.length-1 do\n\t\t\tif arr[minIndex]>arr[frontIndex] then\n\t\t\t\tminIndex🠔frontIndex\n\t\tswapElements(arr, index, minIndex)"
    },  
};
export default information;
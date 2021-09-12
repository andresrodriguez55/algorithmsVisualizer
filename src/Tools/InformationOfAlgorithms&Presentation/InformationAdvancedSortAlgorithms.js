const information={
    Quick:
    {
        name: "Quick Sort",
        information: "<b>The algorithm uses the divide and conquer algorithm design paradigm, partitions the array recursively.</b>\n\nIf the size of the array is one the algorithm will stop.",
        pseudocode: "QucikSort(arr, startIndex, size)\n\tif size<2 then \n\t\treturn\n\t\t\n\tswap(arr[startIndex], arr[RANDOM NUMBER BETWEEN startIndex AND size-1])\n\tposition🠔1+startIndex\n\t\n\tfor x🠔(1+startIndex) to (size+startIndex-1) do\n\t\tif arr[startIndex]>arr[x] then\n\t\t\tswap(arr[x], arr[position])\n\t\t\tposition🠔position+1\n\t\t\t\n\tswap(arr[startIndex], arr[position-1])\n\t\n\tposition🠔position-startIndex\n\tQucikSort(arr, startIndex, position-1)\n\tQucikSort(arr, startIndex+position, size-position)"
    },    

    Merge:
    {
        name: "Merge Sort",
        information: "<b>The algorithm uses the divide and conquer algorithm design paradigm</b>, divides the list in two and recursively with the partitions obtained, if a partition contains one or zero elements it will not be taken into account, the algorithm in each iteration after calling itself with the two partitions obtained will order the list fragment that it has as a parameter.\n\n<b>The algorithm benefits from the memory allocation of the array, since by having the memory address of the array, it can manipulate the content of the array at any time in the iterations.</b>",
        pseudocode: "MergeSort(arr, startIndex, size)\n\tif size<2 then \n\t\treturn\n\t\t\n\thalf🠔floor(size/2)\n\tMergeSort(arr, startIndex, half)\n\tMergeSort(arr, startIndex+half, size-half)\n\t\n\tindex🠔0\n\tleft🠔0\n\tright🠔half\n\ttemp🠔[...size]\n\t\n\twhile left<half or right<size do\n\t\tif right=size or (left<half and arr[left+startIndex]<arr[right+startIndex])\n\t\t\ttemp[index]🠔arr[left+startIndex]\n\t\t\tleft🠔left+1\n\t\t\tindex🠔index+1\n\t\n\t\telse\n\t\t\ttemp[index]🠔arr[right+startIndex]\n\t\t\tright🠔right+1\n\t\t\tindex🠔index+1\n\t\n\tfor x🠔0 to size-1 do\n\t\tarr[x+startIndex]🠔temp[x]"
    },
};
export default information;
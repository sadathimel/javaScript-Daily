const array = [14, 2, 7, 4, 55, 9, 20, 34];


const binarySearch = (arr,key)=>{
    let lowest = 0
    let highest = arr.length - 1

    while (lowest <= highest){
        let mid = Math.floor((lowest + highest) / 2)
        if(arr[mid] === key) return mid
        if( arr[mid] < key) lowest = mid + 1
        if(arr[mid] > key) highest = mid -1
    }
    return -1
}

array.sort((a,b)=>a - b);
console.log(array);
const index = binarySearch(array, 55);
console.log(index);
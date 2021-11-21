const myArray = [1,14, 2, 7, 4, 55, 9, 20, 34,90,657,4];

const bubbleSort = (array) => {
    for (let j = 0; j < array.length; j++){
    for (let i = 0; i < array.length -1; i++){
        if(array[i] > array[i + 1]){
            let temp = array[i];
            array[i] = array[i + 1];
            array[i+1] = temp;
        }

    }
}
}

bubbleSort(myArray);
console.log(myArray);
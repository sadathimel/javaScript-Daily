const myArray = [1, 14, 2, 7, 4, 55, 9, 20, 34, 90, 657, 4];

let dissBubleshort = (array)=>{
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length -1; j++) {
            if(array[j] < array[j + 1]){
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
            
        }
        
    }
}
 dissBubleshort(myArray);
 console.log(myArray);
// const numbers = [1,2,3,4,5];

// let newArr = numbers.map(double);

// function double(value, index, arr){
//     return value * 2;
//     return value * index;
// }

// console.log(newArr);

const products = [
    {
        name: 'laptop',
        price: 1000,
        count: 5
    },
    {
        name: 'desktop',
        price: 1500,
        count: 15
    },
    {
        name: 'mobile',
        price: 500,
        count: 10
    },
];

const totalProductsValue = products.map(item => ({
    name: item.name,
    totalValue: item.price * item.count
}));

// console.log(totalProductsValue);


const str = ['1','2','3','4'];

// const numbers = str.map(item => Number(item));
const numbers = str.map(Number);

console.log(numbers)
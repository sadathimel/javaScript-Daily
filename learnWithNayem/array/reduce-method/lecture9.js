let products = [
  {
    name: "javascript cookbook",
    price: 350,
  },
  {
    name: "Head First Python",
    price: 350,
  },
  {
    name: "Head First Java",
    price: 400,
  },
  {
    name: "javascript cookbook",
    price: 350,
  },
  {
    name: "Head First Java",
    price: 400,
  },
  {
    name: "javascript cookbook",
    price: 350,
  },
];


const invoice = products.reduce((acc,cur)=>{
    if(acc[cur.name]){
        acc[cur.name].quantity++;
        acc[cur.name].price += cur.price;
    }else{
        acc[cur.name] = {
            price: cur.price,
            quantity: 1,
        }
    }
    return acc;
},{});

console.log(invoice);
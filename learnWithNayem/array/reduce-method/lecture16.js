const courses = [
    {
        id: 'OC1',
        name : 'Javascript All You Need to Know',
        topic: 'javascript',
        price: 2599,
    },
    {
        id: 'OC2',
        name : 'Dive into NodeJS',
        topic: 'nodejs',
        price: 2599,
    },
    {
        id: 'OC3',
        name : 'Understand ReactJs Core Features',
        topic: 'javascript',
        price: 1799,
    },
    {
        id: 'OC4',
        name : 'Understand ReactJs Advanced Features',
        topic: 'react',
        price: 3500,
    },
    {
        id: 'OC5',
        name : 'Add to Cart - MERN Project',
        topic: 'mern',
        price: 4099,
    },
    {
        id: 'OC6',
        name : 'Make Fun of Javacrip Array',
        topic: 'mern',
        price: 1799,
    },
];

const discountedPrice = {
  OC1 : 2099,
  OC2 : 2099,
  OC3 : 1399,
  OC4 : 2099,
  OC5 : 3599,
  OC6 : 1399,
};

const updatedCourse = courses.reduce((acc,cur) => {
    if (discountedPrice[cur.id]){
        cur.discountedPrice = discountedPrice[cur.id];
    }else {
        cur.discountedPrice = 0;
    }
    acc.push(cur);
    return acc
},[]);

console.log(updatedCourse)
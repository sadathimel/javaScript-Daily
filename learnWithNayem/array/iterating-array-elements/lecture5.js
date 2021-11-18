const prodictReview = [
  {
    id: 1,
    name: "Sadat Himel",
    resposse: "positive",
    ratings: "5",
  },
  {
    id: 2,
    name: "Tanvir ahmed opel",
    resposse: "positive",
    ratings: "4",
  },
  {
    id: 3,
    name: "Saidul hasan",
    gresposse: "nagative",
    ratings: "4",
  },
  {
    id: 4,
    name: "pronoy sorkar",
    resposse: "positive",
    ratings: "3",
  },
];


const positive = prodictReview.every((value)=> value.ratings > 3);
if(positive){
    console.log('100% Positive Review');
}else {
    console.log('Some Customer Not Satisfied');
}



let testRunsInaSingleMatch = [
  {
    name: "Sadat Himel",
    ran: 374,
  },
  {
    name: "Tanvir ahmed opel",
    ran: '374',
  },
  {
    name: "Saidul hasan",
    ran: 380,
  },
  {
    name: "pronoy sorkar",
    ran: 400,
  },
];

const atLeastOne = testRunsInaSingleMatch.some((value) => value.ran >= 400);
console.log(atLeastOne);
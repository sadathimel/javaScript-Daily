const studentArray = [
  { id: 1, name: "Sadat Himel", gpa: 3.99, email: "sadat.himel@gmail.com" },
  { id: 2, name: "Tanvir ahmed opel", gpa: 2.87, email: "tanvir@gmail.com" },
  { id: 3, name: "Saidul hasan", gpa: 3.09, email: "saidulhasan@gmail.com" },
  { id: 4, name: "pronoy sorkar", gpa: 2.8, email: "pronoysorkar@gmail.com" },
  { id: 5, name: "Sheik Nazmul", gpa: 3.19, email: "nazmulsheik@gmail.com" },
];

const emailTemplates = studentArray
  .filter((value) => value.gpa < 3)
  .map((value) => {
      return {
          ...value,
          title: 'Result Published',
          msg: 'You have Failed'
      }
  });

  console.log(emailTemplates);

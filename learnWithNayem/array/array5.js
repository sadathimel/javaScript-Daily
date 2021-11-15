// Array of Anything

const arr = [10, "Ten", true, getTen, { ten: 11 }, [10, 10]];
console.log(arr);

function getTen() {
  return 10;
}

// Array of Objects
const favChannels = [
  { name: "Stack Learner", url: "https://youtube.com/stacklearner" },
  { name: "Js Bangladesh", url: "https://youtube.com/jsbangladesh" },
  { name: "Traversy Media", url: "https://youtube.com/techguyweb" },
  { name: "Wes Bos", url: "https://youtube.com/wesbos" },
];

// Array of function
const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const times = (a, b) => a * b;
const div = (a, b) => a / b;
const mod = (a, b) => a % b;

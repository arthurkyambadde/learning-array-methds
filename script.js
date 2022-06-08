'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //slice method
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));

// //splice method
// // console.log(arr.splice(2));
// //it mutates the array it cuts off the specified part
// console.log(arr.splice(-1));
// console.log(arr);

// // reverse method
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// //it mutates the original array
// console.log(arr2, 'before');
// console.log(arr2.reverse());
// console.log(arr2, 'after');

// //concat method

// const letters = arr.concat(arr2);
// console.log(letters);
// //doesnt mutate original array
// console.log([...arr, ...arr2]);

// //join method

// console.log(letters.join(' - '));
// console.log(letters.join(''));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//FOR OF LOOP
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You have deposited ${movement}`);
//   } else {
//     console.log(`You have withdrew ${Math.abs(movement)}`); //Math.abs() removes the negative sign
//   }
// }

for (const [i /*key*/, movement /*value*/] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You have deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You have withdrew ${Math.abs(movement)}`); //Math.abs() removes the negative sign
  }
}

console.log('.................for each loop....................');
//FOR EACH LOOP

movements.forEach(function (movement /*element*/, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index}: You have deposited ${movement}`);
    // console.log(movement, index, array);
  } else {
    console.log(`Movement ${index}: You have withdrew ${Math.abs(movement)}`); //Math.abs() removes the negative sign
  }
});

//continue and break statement donot work in the forEAch loop

//FOREACH LOOP WITH MAPS AND SETS

const currencies = new Map([
  //[key, value]
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//set
const currenciesUnique = new Set(['USD', 'USD', 'EUR', 'GBP', 'GBP']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, set) {
  console.log(`${key}: ${value}`);
  //in sets the key is the same as the value because sets have no keys nor values
});

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

const displayMovement = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `

    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
   
    <div class="movements__value">${movement} EUROS</div>
  </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// COMPUTING USERNAME

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);
// console.log(accounts);

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (acc, currentValue /*movement*/) => acc + currentValue,
    0
  );

  labelBalance.textContent = `${account.balance} EUROS`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);

  labelSumIn.textContent = `${incomes} EUROS`;

  const outcomes = account.movements
    .filter(movement => movement < 0)
    .reduce((accumulator, movement) => accumulator + movement, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)} EUROS`;

  const intrest = account.movements
    .filter(movement => movement > 0)
    .map(deposit => deposit * (account.interestRate / 100))
    .filter(deposit => deposit >= 1)
    .reduce((accumulator, deposit) => accumulator + deposit, 0);

  // console.log(intrest);

  labelSumInterest.textContent = `${intrest} EUROS`;
};

//EVENT HANDLERS

const updateUi = function (currentAccount) {
  //display movements
  displayMovement(currentAccount.movements);

  //display balance
  calcDisplayBalance(currentAccount);

  //display summary
  calcDisplaySummary(currentAccount);
};

// console.log(accounts);
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //prevents form from submitting
  e.preventDefault();
  // console.log('log in');

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //dislplay ui and welcome message
    labelWelcome.textContent = `welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //clear inputfields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
  }

  updateUi(currentAccount);
  // console.log('logined in');
  // console.log(currentAccount);
  // console.log(inputLoginUsername.value);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('clicked');

  const amount = Number(inputTransferAmount.value);
  const receiveAccount = accounts.find(
    account => account.userName === inputTransferTo.value
  );
  console.log(amount);
  console.log(receiveAccount);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiveAccount &&
    currentAccount.balance >= amount &&
    receiveAccount?.userName !== currentAccount.username
  ) {
    //doing the transfer
    currentAccount.movements.push(-amount);
    receiveAccount.movements.push(amount);

    updateUi(currentAccount);
    console.log('valid transfer');
  }
});

//LOAN FUNCTIONALITY
btnLoan.addEventListener('click', function (e) {
  e.defaultPrevented();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(movement => movement >= amount / 10)
  ) {
    //add movement
    currentAccount.movement.push(amount);

    updateUi(currentAccount);

    inputLoanAmount.value = '';
  }
});

//FINDINDEX METHOD
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      account => account.userName === currentAccount.userName
    );
    //delete account
    accounts.splice(index, 1);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  //hide UI
  containerApp.style.opacity = 0;
  console.log('closed');
});

// const user = 'Jessica Davis';

// console.log(userName);

// const displayMovementFunction = function (movements) {
//   containerMovements.innerHTML = '';

//   movements.forEach(function (movement, index) {
//     const transactionType = movement > 0 ? 'deposit' : 'withdrawal';

//     const html = `
//     <div class="movements__row">
//     <div class="movements__type movements__type--${transactionType}"> ${
//       index + 1
//     } ${transactionType}</div>

//     <div class="movements__value"> ${movement} €</div>
//     </div>
//     `;
//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };

// displayMovementFunction(account3.movements);
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
    // console.log(`Movement ${i + 1}: You have deposited ${movement}`);
  } else {
    // console.log(`Movement ${i + 1}: You have withdrew ${Math.abs(movement)}`); //Math.abs() removes the negative sign
  }
}

// console.log('.................for each loop....................');
//FOR EACH LOOP

movements.forEach(function (movement /*element*/, index, array) {
  if (movement > 0) {
    // console.log(`Movement ${index}: You have deposited ${movement}`);
    // console.log(movement, index, array);
  } else {
    // console.log(`Movement ${index}: You have withdrew ${Math.abs(movement)}`); //Math.abs() removes the negative sign
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
  // console.log(`${key}: ${value}`);
});

//set
const currenciesUnique = new Set(['USD', 'USD', 'EUR', 'GBP', 'GBP']);
// console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, set) {
  // console.log(`${key}: ${value}`);
  //in sets the key is the same as the value because sets have no keys nor values
});

const checkDogStatus = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);

  const dogs = [...dogsJuliaCorrected, ...dogsKate];
  console.log(dogs);

  dogs.forEach(function (dog, index) {
    if (dog >= 3) {
      console.log(
        `Dog number ${index + 1} is an adult, and is ${dog} years old`
      );
    } else {
      console.log(
        `Dog number ${index + 1} is a puppy, and is ${dog} years old`
      );
    }
  });
};

const dogs = [...[3, 5, 2, 12, 7], ...[4, 1, 15, 8, 3]];

const calcAverageHumanAge = function (dogs) {
  const dogAgeInHumanYears = dogs.map(function (dogAge) {
    if (dogAge <= 2) {
      console.log(dogAge);
      return dogAge * 2;
    } else if (dogAge > 2) {
      console.log(dogAge);
      return 16 + dogAge * 4;
    }
  });
  console.log(dogAgeInHumanYears);

  const filteredDOgs = dogAgeInHumanYears.filter(humanDog => humanDog >= 18);
  console.log(filteredDOgs);

  const averageHumanAge =
    filteredDOgs.reduce(
      (accumulator, filteredDOg) => accumulator + filteredDOg,
      0
    ) / filteredDOgs.length;
  return averageHumanAge;
};

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

//MAP METHOD
// movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUSD = 1.1;

const movementsUSD = movements.map(function (movement) {
  return movement * euroToUSD;
});

// console.log(movements);
// console.log(movementsUSD);

const movementsUsdFor = [];
for (const movement of movements) {
  movementsUsdFor.push(movement * euroToUSD);
}
// console.log('here');
// console.log(movementsUsdFor);

// const isma = [2, 4, 6, 8, 1, 9];

// const ismaModified = isma.map(function (ismaItem) {
//   return (ismaItem * 4) / 2;
// });

// console.log(ismaModified);

const movementDescription = movements.map(
  (movement, index) =>
    `movement ${index + 1}: You ${
      movement > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(movement)}`
);

// console.log(movementDescription);

const deposits = movements.filter(function (movement) {
  return movement > 0;
});

// console.log(deposits);

const withdrawals = movements.filter(function (movement) {
  return movement < 0;
});

// console.log(withdrawals);

const balance = movements.reduce(function (acc, currentValue, index, arr) {
  // console.log(`iteration ${index}: ${acc}`);
  return acc + currentValue;
}, 0);

// console.log(balance);

const max = movements.reduce(function (acc, movement, index, array) {
  if (acc > movement) {
    return acc;
  } else {
    return movement;
  }
}, movements[0]);

// console.log(max);

const min = movements.reduce(function (acc, movement, index, array) {
  if (acc < movement) {
    // console.log(acc);
    return acc;
  } else {
    return movement;
  }
}, movements[0]);
// console.log(min);

//3, 5, 2, 12, 7] , [4, 1, 15, 8, 3]

const totalDepositesUSD = movements
  .filter(movement => movement > 0)
  .map(movement => movement * euroToUSD)
  .reduce((accumulator, movement) => accumulator + movement, 0);

// console.log(totalDepositesUSD);

const array = [4, 2, 7, 9, 5, 4, 5, 7];
// console.log(array.length);

const arrayAverage2 = array.reduce(function (accumulator, arr) {
  return (accumulator = accumulator + arr / array.length);
}, 0);
// array.reduce((accumulator, arr) => accumulator + arr, 0) / array.length;

// console.log(arrayAverage2);

//find method

movements.find(movement => movement < 0);
//only returns one value that satisfies the condition

const account = accounts.find(account => account.owner === 'Sarah Smith');

// console.log(account);

console.log(movements.includes(-130));

//SOME METHOD
//checks wether some items satisfy the condition
const anyDeposit = movements.some(movement => movement > 0);
console.log(anyDeposit);

//EVERY METHOD
//chexks whether all items satisfy the condition
const checkMe = movements.every(movement => movement > 0);
console.log(checkMe);

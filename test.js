let stringCal = function (s) {
  // turn string to array
  let arr = s.split("");
  let count = 0;
  let largestCount = 0;
  let repeaters = [];

  // loop through arr and add all the items in arry to a new array
  for (let i = 0; i < arr.length; i++) {
    // if arr[i] is in repeaters array, then skip
    if (repeaters.includes(arr[i])) {
      // check if count is greater than largestCount
      if (count > largestCount) {
        largestCount = count;
      }
      count = 0;
      continue;
    }
    count++;
    repeaters.push(arr[i]);
  }
  return largestCount;
};

const myString = stringCal("hajkdfhljashfhjkf");

console.log(myString);

function countDigitOccurrences(limit, digit) {
  let count = 0;
  let digitStr = digit.toString();

  for (let i = 1; i <= limit; i++) {
    let strNum = i.toString();
    for (let char of strNum) {
      if (char === digitStr) {
        count++;
      }
    }
  }

  return count;
}

const limit = 1536;
const digit = 6;
console.log(
  `El dígito ${digit} aparece ${countDigitOccurrences(
    limit,
    digit
  )} veces entre 1 y ${limit}.`
);

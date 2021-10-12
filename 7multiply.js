function weirdMultiply(sentence) {
  if (sentence < 10) {
    return sentence;
  }
  let konversi = sentence.toString();
  let digit = Array.from(String(konversi), Number);
  let panjang = digit.length - 1;
  let angka = 1;
  for (let i = 0; i <= panjang; i++) {
    angka = angka * digit[i];
  }
  return weirdMultiply(angka);
}

console.log(weirdMultiply(39)); // -> 3 * 9 = 27 -> 2 * 7 = 14 -> 1 * 4 = 4
console.log(weirdMultiply(999)); // -> 9 * 9 * 9 = 729 -> 7 * 2 * 9 = 126 -> 1 * 2 * 6 = 12 -> 1 * 2 = 2
console.log(weirdMultiply(3)); // -> 3 karena telah satu digit

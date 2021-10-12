function indexPrime(param1) {
  let salah = "Masukkan urutan yang valid!";
  if (param1 <= 0) {
    return salah;
  }
  if (param1 == 1) {
    return 2;
  }
  let berhenti = param1;
  let prima = [2];
  let angka = 3;
  let pembagi = 2;
  for (; prima.length < berhenti; angka++) {
    for (; ; pembagi++) {
      let x = angka % pembagi;
      if (x == 0 && pembagi == angka) {
        prima.push(angka);
        break;
      }
      if (x == 0) {
        break;
      }
    } pembagi = 2;
  } return prima[berhenti-1];
}
console.log(indexPrime(4)); //result => 7
console.log(indexPrime(500)); //result => 3571
console.log(indexPrime(37786)); //result => 450881

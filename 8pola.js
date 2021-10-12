function pola(str) {
  let pecah = str.split(" ");
  let cek = /#/;
  let pagar = [];
  for (i = 0; i < pecah.length; i++) {
    if (cek.test(pecah[i]) == true) {
      pagar.push(pecah[i]);
    }
  }
  let hasil1 = [];
  for (let i = 0; i < 10; i++) {
    let istring = i.toString();
    let x = pagar[0].replace(/#/g, istring);
    let xangka = parseInt(x);
    hasil1.push(xangka * pecah[2]);
  }
  let hasil2 = [];
  for (let i = 0; i < 10; i++) {
    let istring = i.toString();
    let x = pagar[1].replace(/#/g, istring);
    let xangka = parseInt(x);
    hasil2.push(xangka);
  }
  for (i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (hasil1[i] == hasil2[j]) {
        var bener = [i,hasil2[j]];
      }
    }
  }
  let bener2str = bener[1].toString();
  bener[1] = parseInt(bener2str.charAt(pagar[1].indexOf("#")));

  return bener;
}

console.log(pola("42#3 * 188 = 80#204"));
//result: [8, 5]

console.log(pola("8#61 * 895 = 78410#5"));
// [7,9]

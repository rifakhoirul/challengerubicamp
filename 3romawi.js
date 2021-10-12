function romawi(n) {
    let x="";
    while (n >= 1000) { x += "M"; n -= 1000 };
    while (n >= 900) { x += "CM"; n -= 900 };
    while (n >= 500) { x += "D"; n -= 500 };
    while (n >= 400) { x += "CD"; n -= 400 };
    while (n >= 100) { x += "C"; n -= 100 };
    while (n >= 90) { x += "XC"; n -= 90 };
    while (n >= 50) { x += "L"; n -= 50 };
    while (n >= 40) { x += "XL"; n -= 40 };
    while (n >= 10) { x += "X"; n -= 10 };
    while (n >= 9) { x += "IX"; n -= 9 };
    while (n >= 5) { x += "V"; n -= 5 };
    while (n >= 4) { x += "IV"; n -= 4 };
    while (n >= 1) { x += "I"; n -= 1 };
    return x;
}

console.log("Script Testing untuk Konversi Romawi\n");
console.log("input | expected | result");
console.log("4     | IV       | ", romawi(4));
console.log("9     | IX       | ", romawi(9));
console.log("13    | XIII     | ", romawi(13));
console.log("1453  | MCDLIII  | ", romawi(1453));
console.log("1646  | MDCXLVI  | ", romawi(1646));
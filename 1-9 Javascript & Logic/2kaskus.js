function deretKaskus(n) {
    let x = [];
    for (let i = 1; i <= n; i++) {
        y = i * 3;
        if (y % 5 == 0 && y % 6 == 0) {
            y = 'KASKUS';
        } else if (y % 5 == 0) {
            y = 'KAS';
        } else if (y % 6 == 0) {
            y = 'KUS';
        } x.push(y);
    }
    return x;
}

console.log(deretKaskus(10));
function spiral(param1) {
  let n = param1;
  
  //check value
  if (n <= 0) { let error = "Masukkan angka yang valid!"; return error }
  
  //bikin matriks
  let matriks = [];
  let count = 0;
  for (var i = 0; i < n; i++) {
    matriks[i] = [];
    for (var j = 0; j < n; j++) {
      matriks[i][j] = count++;
    }
  }
  
  //bikin spiral
  let hasil = [];
  let kanan = n;
  let bawah = n;
  let kiri = 0;
  let atas = 0;
  i = 0;
  j = 0;
  for (; ;) {
    if (hasil.length == n ** 2) { break }
    for (; j < kanan; j++) {
      if (hasil.length == n ** 2) { break }
      hasil.push(matriks[i][j]);
    }
    j--;
    i++;
    atas++;
    kanan--;
    for (; i < bawah; i++) {
      if (hasil.length == n ** 2) { break }
      hasil.push(matriks[i][j]);
    }
    i--;
    j--
    bawah--;
    for (; j >= kiri; j--) {
      if (hasil.length == n ** 2) { break }
      hasil.push(matriks[i][j]);
    }
    kiri++;
    j++;
    i--;
    for (; i >= atas; i--) {
      if (hasil.length == n ** 2) { break }
      hasil.push(matriks[i][j]);
    }
    i++;
    j++;
  }
  return console.log(hasil)
}

spiral(5)
spiral(6)
spiral(7)
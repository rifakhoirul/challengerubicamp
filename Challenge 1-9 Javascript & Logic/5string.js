function stringManipulation(word) {
  let awal = word.charAt(0);
  let baru = word.slice(1) + word.charAt(0);
  const vokal = /[aeiuo]/;
  if (vokal.test(awal) == true) {
    console.log(word);
  } else {
    console.log(baru += "nyo");
  }
}

stringManipulation("ayam"); //"ayam"
stringManipulation("bebek"); //"ebekbnyo"

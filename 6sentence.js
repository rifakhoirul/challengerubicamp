function sentencesManipulation(sentence) {
  const pecah = sentence.split(" ");
  let final=[];
  for (let i = 0; i < pecah.length; i++) {
    let awal = pecah[i].charAt(0);
    let baru = pecah[i].slice(1) + awal;
    const vokal = /[aeiuo]/;
    if (vokal.test(awal) == true) {
      final.push(pecah[i]);
    } else {
      final.push((baru += "nyo"));
    }
  } console.log(final.join(" "));
}

sentencesManipulation("ibu pergi ke pasar bersama aku");

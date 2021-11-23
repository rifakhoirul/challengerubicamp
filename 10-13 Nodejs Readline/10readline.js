const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu disini > '
});

rl.prompt();
rl.on('line', (jawab) => {
    const pecah = jawab.split(" ");
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
    } console.log(`hasil konversi: ${final.join(" ")}`);
    rl.prompt();
}).on('close', ()=>{
    console.log("Good bye!");
    process.exit(0);
})
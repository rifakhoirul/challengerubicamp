const fs = require('fs')
let data = fs.readFileSync('data.json', 'utf-8')
let ambil = data.split(/[""]/)
let soal = [ambil[3], ambil[11], ambil[19]]
let jwbn = [ambil[7], ambil[15], ambil[23]]
console.log("Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya! \n")

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
rl.setPrompt("Tebakan: ")
console.log(`Pertanyaan: ${soal[0]}`)
rl.prompt()
let i = 0;
rl.on('line', (jawab) => {
    if (jawab == `${jwbn[i]}`) {
        console.log("Selamat Anda Benar! \n");
        i++
        if (i == soal.length){
            console.log("Hore Anda Menang!");
            rl.close();
        }
        console.log(`Pertanyaan: ${soal[i]}`)
    } else {
        console.log("Wkwkwkwk, Anda kurang beruntung!\n")
    }
    rl.prompt()
}).on('close',()=>{
    process.exit(0);
})
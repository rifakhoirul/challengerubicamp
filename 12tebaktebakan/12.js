const { argv } = require('process');
const fs = require('fs');
let data = fs.readFileSync('data.json', 'utf-8');
let ambil = data.split(/[""]/);
let soal = [ambil[3], ambil[11], ambil[19]];
let jwbn = [ambil[7], ambil[15], ambil[23]];
let i = 0;
let salah = 0;
let sekip = [];
let jwbnsekip = [];

if (process.argv[2] != 'data.json') {
    console.log("Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'");
}
else {
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    console.log("Selamat datang di permainan Tebak-tebakan. Kamu akan diberikan pertanyaan dari file 'data.json'.\nUntuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.\n");
    console.log(`Pertanyaan: ${soal[i]}`)
    rl.setPrompt("Jawaban: ")
    rl.prompt()
    rl.on('line', (jawab) => {
        //kalau jawab bener
        if (jawab.trim().toLowerCase() == `${jwbn[i]}`) {
            console.log("\nAnda beruntung! \n");
            i++
            
            //kalau udh bener semua ga ada yg sekip lagi
            if (i == soal.length && sekip.length == 0) {
                console.log("Anda berhasil!");
                rl.close();
            }

            //kalau masih ada soal yg disekip
            if (i == soal.length && sekip.length > 0) {
                soal = sekip;
                jwbn = jwbnsekip;
                sekip = [];
                jwbnsekip = []
                i = 0;
                salah = 0;
            }

            //lanjut ke soal berikutnya
            console.log(`Pertanyaan: ${soal[i]}`)
            salah = 0;
        }

        //kalau jawab skip
        else if (jawab.toLowerCase() == 'skip') {
            sekip.push(soal[i]);
            jwbnsekip.push(jwbn[i]);
            i++;
            if (i == soal.length) {
                soal = sekip;
                jwbn = jwbnsekip;
                sekip = [];
                jwbnsekip = [];
                i = 0;
                salah = 0;
            }
            console.log(`\nPertanyaan: ${soal[i]}`);
            salah = 0;
        }

        //kalau jawab salah
        else {
            salah++
            console.log(`\nAnda kurang beruntung! Anda telah salah ${salah} kali, silahkan coba lagi.`)
        }
        rl.prompt()
    }).on('close', () => {
        process.exit(0);
    })
}
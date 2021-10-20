let username = 'rubi'
let password = 'rubicamp'
let sl = '=============================================================='
let menu = 'Silahkan pilih opsi di bawah ini:\n[1] Mahasiswa\n[2] Jurusan\n[3] Dosen\n[4] Mata Kuliah\n[5] Kontrak\n[6] Keluar'
console.log(`${sl}\nWelcome to Universitas Pendidikan Indonesia\nJl Setiabudhi No. 255\n${sl}`)
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.setPrompt('username: ');
rl.prompt()
rl.question()
rl.on('line', (input) => {
    if (input == username) {
        console.log(`${sl}`)
        rl.setPrompt('password: ')
        rl.prompt()
    }
    if (input == password) {
        console.log(`${sl}\nWelcome, ${username}. Your access level is: ADMIN\n${sl}\n${menu}\n${sl}`)
        rl.setPrompt('Masukkan salah satu no. dari opsi di atas: ')
        rl.prompt()
    }
    if (input == '1'){

    }
})


/*
1
==============================================================
Silahkan pilih opsi di bawah ini:
[1] Daftar Murid
[2] Cari Murid
[3] Tambah Murid
[4] Hapus Murid
[5] Kembali
==============================================================
Masukkan salah satu no. dari opsi di atas: 1
==============================================================
Masukkan NIM:
Mahasiswa dengan NIM ${} tidak terdaftar
Masukkan NIM:
==============================================================
Student Details
==============================================================
Id          :
Nama        :
Alamat      :
Jurusan     :
==============================================================


*/
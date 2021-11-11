//declare
const Table = require('cli-table');
const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "/university.db";
//query table userdata
let userdata = []
let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    db.serialize(function () {
        //userdata
        let sql = "SELECT * FROM userdata";
        db.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                userdata = rows
            } else { "tidak ada data" }
        })
    });
    db.close();
});
//query table mahasiswa
let tablemahasis = []
let db1 = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    db1.serialize(function () {
        let sql = "SELECT * from mahasiswa;";
        db1.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                tablemahasis = rows
            } else { "tidak ada data" }
        })

    });
    db1.close();
});
//query tablejurusan
let tablejurusan = []
let db2 = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    db2.serialize(function () {
        let sql = "select * from jurusan;";
        db2.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                tablejurusan = rows
            } else { "tidak ada data" }
        })

    });
    db2.close();
});
//query tabledosen
let tabledosen = []
let db3 = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    db3.serialize(function () {
        let sql = "select * from dosen;";
        db3.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                tabledosen = rows
            } else { "tidak ada data" }
        })

    });
    db3.close();
});
//query tablematakuliah
let tablematkul = []
let db4 = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    db4.serialize(function () {
        let sql = "select * from matakuliah;";
        db4.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                tablematkul = rows
            } else { "tidak ada data" }
        })

    });
    db4.close();
});
//query tablekrs
let tablekrs = []
let db5 = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    db5.serialize(function () {
        let sql = "select * from krs;";
        db5.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                tablekrs = rows
            } else { "tidak ada data" }
        })
    });
    db5.close();
});
//navigation
let select = '';
let nav = 0;
let navsub = 0;
//wadah
let tambahmahasiswa = { nim: 0, namahasiswa: '', alamat: '', kodejurusan: '' }
let tambahjurusan = { kodejurusan: '', namajurusan: '' }
let tambahdosen = { nip: 0, namadosen: '', kodejurusan: '' }
let tambahmatkul = { kodematkul: '', namamatkul: '', sks: 0, kodejurusan: '', nip: 0 }
let tambahkrs = { idkrs: 0, kodematkul: '', nim: 0, nilai: '' }
let sl = '=============================================================='
//function
function mainMenu() {
    console.log(`${sl}\nSilahkan pilih opsi di bawah ini:\n[1] Mahasiswa\n[2] Jurusan\n[3] Dosen\n[4] Mata Kuliah\n[5] Kontrak\n[6] Keluar\n${sl}`);
    rl.setPrompt('Masukkan salah satu no. dari opsi di atas: ');
    rl.prompt()
}
function subMenu() {
    console.log(`${sl}\nSilahkan pilih opsi di bawah ini:\n[1] Daftar ${select}\n[2] Cari ${select}\n[3] Tambah ${select}\n[4] Hapus ${select}\n[5] Kembali\n${sl}`)
    rl.setPrompt('Masukkan salah satu no. dari opsi di atas: ');
    rl.prompt()
}
function showMahasiswa() {
    let table;
    table = new Table({
        head: Object.keys(tablemahasis[0])
        , colWidths: [10, 20, 20, 20]
    });
    for (let i = 0; i < tablemahasis.length; i++) {
        let tablearray = [tablemahasis[i].nim, tablemahasis[i].namamahasiswa, tablemahasis[i].alamat, tablemahasis[i].kodejurusan]
        table.push(tablearray)
    }
    console.log(`${sl}`)
    console.log(table.toString());
}
function showJurusan() {
    let table;
    table = new Table({
        head: Object.keys(tablejurusan[0])
        , colWidths: [20, 20]
    });
    for (let i = 0; i < tablejurusan.length; i++) {
        let tablearray = [tablejurusan[i].kodejurusan, tablejurusan[i].namajurusan]
        table.push(tablearray)
    }
    console.log(`${sl}`)
    console.log(table.toString());
}
function showDosen() {
    let table;
    table = new Table({
        head: Object.keys(tabledosen[0])
        , colWidths: [10, 20, 20]
    });
    for (let i = 0; i < tabledosen.length; i++) {
        let tablearray = [tabledosen[i].nip, tabledosen[i].namadosen, tabledosen[i].kodejurusan]
        table.push(tablearray)
    }
    console.log(`${sl}`)
    console.log(table.toString());
}
function showMatkul() {
    let table;
    table = new Table({
        head: Object.keys(tablematkul[0])
        , colWidths: [20, 20, 5, 20, 10]
    });
    for (let i = 0; i < tablematkul.length; i++) {
        let tablearray = [tablematkul[i].kodematkul, tablematkul[i].namamatkul, tablematkul[i].sks, tablematkul[i].kodejurusan, tablematkul[i].nip]
        table.push(tablearray)
    }
    console.log(`${sl}`)
    console.log(table.toString());
}
function showKrs() {
    let table;
    table = new Table({
        head: Object.keys(tablekrs[0])
        , colWidths: [10, 20, 20, 10]
    });
    for (let i = 0; i < tablekrs.length; i++) {
        let tablearray = [tablekrs[i].idkrs, tablekrs[i].kodematkul, tablekrs[i].nim, tablekrs[i].nilai]
        table.push(tablearray)
    }
    console.log(`${sl}`)
    console.log(table.toString());
}
// readline
console.log(`${sl}\nWelcome to Universitas Pendidikan Indonesia\nJl Setiabudhi No. 255\n${sl}`)
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
///login
rl.question('username: ', (username) => {
    let usercheck = 0;
    let j = 0;
    for (let i = 0; i < userdata.length; i++) {
        if (userdata[i].user == username) {
            usercheck++;
            j = i;
        }
    }
    if (usercheck == 1) {
        rl.question('password: ', (password) => {
            if (userdata[j].pwd == password) {
                console.log(`${sl}\nWelcome, ${userdata[j].user}. Your access level is: ${userdata[j].roles}`);
                mainMenu();
                //Interface
                rl.on('line', (input) => {
                    // [1] Mahasiswa
                    if (input == '1' && nav == 0 && navsub == 0) {
                        select = 'mahasiswa';
                        nav = 1;
                        subMenu();
                    }
                    // [2] Jurusan
                    else if (input == '2' && nav == 0 && navsub == 0) {
                        select = 'jurusan'
                        nav = 1;
                        subMenu();
                    }
                    // [3] Dosen
                    else if (input == '3' && nav == 0 && navsub == 0) {
                        select = 'dosen'
                        nav = 1;
                        subMenu();
                    }
                    // [4] Mata Kuliah
                    else if (input == '4' && nav == 0 && navsub == 0) {
                        select = 'matakuliah'
                        nav = 1;
                        subMenu();
                    }
                    // [5] KRS
                    else if (input == '5' && nav == 0 && navsub == 0) {
                        select = 'krs'
                        nav = 1;
                        subMenu();
                    }
                    // [6] Keluar
                    else if (input == '6' && nav == 0 && navsub == 0) {
                        select = ''
                        console.log(`${sl}\nKamu telah keluar.`)
                        rl.close()
                    }
                    // [X][1] Daftar Y
                    else if (input == '1' && nav == 1 && navsub == 0) {
                        if (select == 'mahasiswa') { showMahasiswa() }
                        else if (select == 'jurusan') { showJurusan() }
                        else if (select == 'dosen') { showDosen() }
                        else if (select == 'matakuliah') { showMatkul() }
                        else if (select == 'krs') { showKrs() }
                        subMenu();
                    }

                    // [X][2] Cari Y
                    else if (input == '2' && nav == 1 && navsub == 0) {
                        console.log(`${sl}`)
                        if (select == 'mahasiswa') {
                            rl.setPrompt('Masukkan NIM: ')
                        }
                        else if (select == 'jurusan') {
                            rl.setPrompt('Masukkan KodeJurusan: ')
                        }
                        else if (select == 'dosen') {
                            rl.setPrompt('Masukkan NIP: ')
                        }
                        else if (select == 'matakuliah') {
                            rl.setPrompt('Masukkan kode mata kuliah: ')
                        }
                        else if (select == 'krs') {
                            rl.setPrompt('Masukkan Id KRS: ')
                        }
                        rl.prompt()
                        navsub = 1;
                    }
                    // [[X][2] Cari Y => searching
                    else if (nav == 1 && navsub == 1) {
                        if (select == 'mahasiswa') {
                            for (let i = 0; i < tablemahasis.length; i++) {
                                if (input == tablemahasis[i].nim) {
                                    console.log(`${sl}\nStudent Details\n${sl}`);
                                    console.log(`NIM        : ${tablemahasis[i].nim}`);
                                    console.log(`Nama       : ${tablemahasis[i].namamahasiswa}`);
                                    console.log(`Alamat     : ${tablemahasis[i].alamat}`);
                                    console.log(`Jurusan    : ${tablemahasis[i].kodejurusan}`);
                                    subMenu();
                                    navsub = 0;
                                }
                            }
                            if (navsub == 1) {
                                console.log(`Mahasiswa dengan NIM ${input} tidak terdaftar\n${sl}`)
                                rl.setPrompt(`Masukkan NIM: `)
                                rl.prompt()
                            }
                        }
                        else if (select == 'jurusan') {
                            for (let i = 0; i < tablejurusan.length; i++) {
                                if (input == tablejurusan[i].kodejurusan) {
                                    console.log(`${sl}\nDetail Jurusan\n${sl}`);
                                    console.log(`Kode Jurusan   : ${tablejurusan[i].kodejurusan}`);
                                    console.log(`Nama Jurusan   : ${tablejurusan[i].namajurusan}`);
                                    subMenu();
                                    navsub = 0;
                                }
                            }
                            if (navsub == 1) {
                                console.log(`Jurusan dengan kode ${input} tidak terdaftar\n${sl}`)
                                rl.setPrompt(`Masukkan kode jurusan: `)
                                rl.prompt()
                            }
                        }
                        else if (select == 'dosen') {
                            for (let i = 0; i < tabledosen.length; i++) {
                                if (input == tabledosen[i].nip) {
                                    console.log(`${sl}\nDetail Dosen\n${sl}`);
                                    console.log(`NIP            : ${tabledosen[i].nip}`);
                                    console.log(`Nama Dosen     : ${tabledosen[i].namadosen}`);
                                    console.log(`Kode Jurusan   : ${tabledosen[i].kodejurusan}`);
                                    subMenu();
                                    navsub = 0;
                                }
                            }
                            if (navsub == 1) {
                                console.log(`Dosen dengan NIP ${input} tidak terdaftar\n${sl}`)
                                rl.setPrompt(`Masukkan NIP: `)
                                rl.prompt()
                            }
                        }
                        else if (select == 'matakuliah') {
                            for (let i = 0; i < tablematkul.length; i++) {
                                if (input == tablematkul[i].kodematkul) {
                                    console.log(`${sl}\nDetail Mata Kuliah\n${sl}`);
                                    console.log(`Kode Mata Kuliah   : ${tablematkul[i].kodematkul}`);
                                    console.log(`Nama Mata Kuliah   : ${tablematkul[i].namamatkul}`);
                                    console.log(`Kode Jurusan       : ${tablematkul[i].kodejurusan}`);
                                    console.log(`NIP                : ${tablematkul[i].nip}`);
                                    subMenu();
                                    navsub = 0;
                                }
                            }
                            if (navsub == 1) {
                                console.log(`Mata Kuliah dengan kode ${input} tidak terdaftar\n${sl}`)
                                rl.setPrompt(`Masukkan kode mata kuliah: `)
                                rl.prompt()
                            }
                        }
                        else if (select == 'krs') {
                            for (let i = 0; i < tablekrs.length; i++) {
                                if (input == tablekrs[i].idkrs) {
                                    console.log(`${sl}\nDetail KRS\n${sl}`);
                                    console.log(`Id KRS             : ${tablekrs[i].idkrs}`);
                                    console.log(`Kode Mata Kuliah   : ${tablekrs[i].kodematkul}`);
                                    console.log(`NIM                : ${tablekrs[i].nim}`);
                                    console.log(`Nilai              : ${tablekrs[i].nilai}`);
                                    subMenu();
                                    navsub = 0;
                                }
                            }
                            if (navsub == 1) {
                                console.log(`Mata Kuliah dengan kode ${input} tidak terdaftar\n${sl}`)
                                rl.setPrompt(`Masukkan Id KRS: `)
                                rl.prompt()
                            }
                        }

                    }
                    // [X][3] Tambah Y (1)
                    else if (input == '3' && nav == 1 && navsub == 0) {
                        console.log(`${sl}\nLengkapi data di bawah ini:`)
                        if (select == 'mahasiswa') {
                            rl.setPrompt(`NIM: `)
                        }
                        else if (select == 'jurusan') {
                            rl.setPrompt(`Kode jurusan: `)
                        }
                        else if (select == 'dosen') {
                            rl.setPrompt(`NIP: `)
                        }
                        else if (select == 'matakuliah') {
                            rl.setPrompt(`Kode mata kuliah: `)
                        }
                        else if (select == 'krs') {
                            rl.setPrompt(`Id KRS: `)
                        }
                        rl.prompt()
                        navsub = 2
                    }
                    // [X][3] Tambah Y (2)
                    else if (nav == 1 && navsub == 2) {
                        if (select == 'mahasiswa') {
                            tambahmahasiswa.nim = input
                            rl.setPrompt(`Nama: `)
                        }
                        else if (select == 'jurusan') {
                            tambahjurusan.kodejurusan = input
                            rl.setPrompt(`Nama jurusan: `)
                        }
                        else if (select == 'dosen') {
                            tambahdosen.nip = input
                            rl.setPrompt(`Nama dosen: `)
                        }
                        else if (select == 'matakuliah') {
                            tambahmatkul.kodematkul = input
                            rl.setPrompt(`Nama mata kuliah: `)
                        }
                        else if (select == 'krs') {
                            tambahkrs.idkrs = input
                            rl.setPrompt(`Kode mata kuliah: `)
                        }
                        rl.prompt()
                        navsub = 3
                    }
                    // [X][3] Tambah Y (3)
                    else if (nav == 1 && navsub == 3) {
                        if (select == 'mahasiswa') {
                            tambahmahasiswa.namamahasiswa = input
                            rl.setPrompt(`Alamat: `)
                            rl.prompt()
                            navsub = 4
                        }
                        else if (select == 'jurusan') {
                            tambahjurusan.namajurusan = input
                            tablejurusan.push(tambahjurusan)
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `INSERT INTO jurusan values('${tambahjurusan.kodejurusan}', '${tambahjurusan.namajurusan}'); `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showJurusan()
                                        subMenu()
                                        navsub = 0
                                        tambahjurusan = { kodejurusan: '', namajurusan: '' }
                                    });
                                });
                                db.close();
                            });
                        }
                        else if (select == 'dosen') {
                            tambahdosen.namadosen = input
                            rl.setPrompt(`Kode jurusan: `)
                            rl.prompt()
                            navsub = 4
                        }
                        else if (select == 'matakuliah') {
                            tambahmatkul.namamatkul = input
                            rl.setPrompt(`SKS: `)
                            rl.prompt()
                            navsub = 4
                        }
                        else if (select == 'krs') {
                            tambahkrs.kodematkul = input
                            rl.setPrompt(`NIM: `)
                            rl.prompt()
                            navsub = 4
                        }
                    }
                    // [X][3] Tambah Y (4)
                    else if (nav == 1 && navsub == 4) {
                        if (select == 'mahasiswa') {
                            tambahmahasiswa.alamat = input
                            rl.setPrompt(`Jurusan: `)
                            rl.prompt()
                            navsub = 5
                        }
                        else if (select == 'dosen') {
                            tambahdosen.kodejurusan = input
                            tabledosen.push(tambahdosen)
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `INSERT INTO dosen values(${tambahdosen.nip}, '${tambahdosen.namadosen}', '${tambahdosen.kodejurusan}'); `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showDosen()
                                        subMenu()
                                        navsub = 0
                                        tambahdosen = { nip: 0, namadosen: '', kodejurusan: '' }
                                    });
                                });
                                db.close();
                            });
                        }
                        else if (select == 'matakuliah') {
                            tambahmatkul.sks = input
                            rl.setPrompt(`Kode jurusan: `)
                            rl.prompt()
                            navsub = 5
                        }
                        else if (select == 'krs') {
                            tambahkrs.nim = input
                            rl.setPrompt(`Nilai: `)
                            rl.prompt()
                            navsub = 5
                        }
                    }
                    // [X][3] Tambah Y (5)
                    else if (nav == 1 && navsub == 5) {
                        if (select == 'mahasiswa') {
                            tambahmahasiswa.kodejurusan = input
                            tablemahasis.push(tambahmahasiswa)
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `INSERT INTO mahasiswa values(${tambahmahasiswa.nim}, '${tambahmahasiswa.namamahasiswa}', '${tambahmahasiswa.alamat}', '${tambahmahasiswa.kodejurusan}'); `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showMahasiswa()
                                        subMenu()
                                        navsub = 0
                                        tambahmahasiswa = { nim: 0, namahasiswa: '', alamat: '', kodejurusan: '' }
                                    });
                                });
                                db.close();
                            });
                        }
                        else if (select == 'matakuliah') {
                            tambahmatkul.kodejurusan = input
                            rl.setPrompt(`NIP: `)
                            rl.prompt()
                            navsub = 6
                        }
                        else if (select == 'krs') {
                            tambahkrs.nilai = input
                            tablekrs.push(tambahkrs)
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `INSERT INTO krs values(${tambahkrs.idkrs}, '${tambahkrs.kodematkul}', ${tambahkrs.nim}, '${tambahkrs.nilai}'); `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showKrs()
                                        subMenu()
                                        navsub = 0
                                        tambahkrs = { idkrs: 0, kodematkul: '', nim: 0, nilai: '' }
                                    });
                                });
                                db.close();
                            });
                        }
                    }
                    // [X][3] Tambah Y (6)
                    else if (nav == 1 && navsub == 6) {
                        if (select == 'matakuliah') {
                            tambahmatkul.nip = input
                            tablematkul.push(tambahmatkul)
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `INSERT INTO matakuliah values('${tambahmatkul.kodematkul}', '${tambahmatkul.namamatkul}', ${tambahmatkul.sks}, '${tambahmatkul.kodejurusan}', ${tambahmatkul.nip}); `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showMatkul()
                                        subMenu()
                                        navsub = 0
                                        tambahmatkul = { kodematkul: '', namamatkul: '', sks: 0, kodejurusan: '', nip: 0 }
                                    });
                                });
                                db.close();
                            });
                        }
                    }
                    // [X][4] Hapus Y
                    else if (input == '4' && nav == 1 && navsub == 0) {
                        console.log(sl)
                        if (select == 'mahasiswa') {
                            rl.setPrompt('Masukkan NIM mahasiswa yang akan dihapus: ')
                        }
                        else if (select == 'jurusan') {
                            rl.setPrompt('Masukkan kode jurusan yang akan dihapus: ')
                        }
                        else if (select == 'dosen') {
                            rl.setPrompt('Masukkan NIP dosen yang akan dihapus: ')
                        }
                        else if (select == 'matakuliah') {
                            rl.setPrompt('Masukkan kode mata kuliah yang akan dihapus: ')
                        }
                        else if (select == 'krs') {
                            rl.setPrompt('Masukkan Id KRS yang akan dihapus: ')
                        }
                        rl.prompt();
                        navsub = 99
                    }
                    // [X][4] Hapus Y => processing
                    else if (nav == 1 && navsub == 99) {
                        if (select == 'mahasiswa') {
                            for (let i = 0; i < tablemahasis.length; i++) {
                                if (input == `${tablemahasis[i].nim}`) {
                                    tablemahasis.splice(i, 1)
                                }
                            }
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `DELETE FROM mahasiswa WHERE nim = ${input} `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showMahasiswa()
                                        subMenu();
                                        navsub = 0
                                    });
                                });
                                db.close();
                            });
                        }
                        else if (select == 'jurusan') {
                            for (let i = 0; i < tablejurusan.length; i++) {
                                if (input == `${tablejurusan[i].kodejurusan}`) {
                                    tablejurusan.splice(i, 1)
                                }
                            }
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `DELETE FROM jurusan WHERE kodejurusan = '${input}' `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showJurusan()
                                        subMenu();
                                        navsub = 0
                                    });
                                });
                                db.close();
                            });
                        }
                        else if (select == 'dosen') {
                            for (let i = 0; i < tabledosen.length; i++) {
                                if (input == `${tabledosen[i].nip}`) {
                                    tabledosen.splice(i, 1)
                                }
                            }
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `DELETE FROM dosen WHERE nip = ${input} `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showDosen()
                                        subMenu();
                                        navsub = 0
                                    });
                                });
                                db.close();
                            });
                        }
                        else if (select == 'matakuliah') {
                            for (let i = 0; i < tablematkul.length; i++) {
                                if (input == `${tablematkul[i].kodematkul}`) {
                                    tablematkul.splice(i, 1)
                                }
                            }
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `DELETE FROM matakuliah WHERE kodematkul = '${input}' `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showMatkul()
                                        subMenu();
                                        navsub = 0
                                    });
                                });
                                db.close();
                            });
                        }
                        else if (select == 'krs') {
                            for (let i = 0; i < tablekrs.length; i++) {
                                if (input == `${tablekrs[i].idkrs}`) {
                                    tablekrs.splice(i, 1)
                                }
                            }
                            let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
                                if (err) throw err;
                                db.serialize(function () {
                                    let sql = `DELETE FROM krs WHERE idkrs = ${input} `;
                                    db.run(sql, (err) => {
                                        if (err) throw err;
                                        showKrs()
                                        subMenu();
                                        navsub = 0
                                    });
                                });
                                db.close();
                            });
                        }
                    }
                    // [X][5] Kembali
                    else if (input == '5' && nav == 1 && navsub == 0) {
                        nav = 0;
                        select = ''
                        mainMenu();
                    }
                    else {
                        console.log(`${sl}\nMasukkan input yang benar!`)
                        mainMenu();
                        select = '';
                        nav = 0;
                        navsub = 0;
                    }
                })
            }
            else {
                console.log('password salah!');
                rl.close();
            }
        })
    }
    else if (usercheck == 0) {
        console.log('username tidak ditemukan!');
        rl.close();
    }
})
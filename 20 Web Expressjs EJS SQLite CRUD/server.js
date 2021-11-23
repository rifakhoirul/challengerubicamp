const fs = require('fs');
let filter = {};

const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "/data.db";

let dataraw = [];
let data = [];
let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    db.serialize(function () {
        let sql = "SELECT * FROM bread";
        db.all(sql, (err, rows) => {
            if (err) throw err;
            if (rows) {
                dataraw = rows;
                data = dataraw;
            } else { "tidak ada data" }
        })
    });
    db.close();
});

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    let data = dataraw;
    filter = req.query
    let filtered = []
    if (filter.IDcheck == 'IDcheck') {
        if (filter.IDfilter) {
            let i = Number(filter.IDfilter)
            filtered.push(data[i - 1])
        } else { filtered = data }
    } else { filtered = data }
    if (filter.stringcheck == 'stringcheck') {
        if (filter.stringfilter) {
            let tempfilter = []
            for (let i = 0; i < filtered.length; i++) {
                if (filtered[i].stringdb.includes(filter.stringfilter)) { tempfilter.push(filtered[i]) }
            }
            filtered = tempfilter
        }
    }
    if (filter.integercheck == 'integercheck') {
        if (filter.integerfilter) {
            let tempfilter = []
            for (let i = 0; i < filtered.length; i++) {
                if (filtered[i].integerdb == filter.integerfilter) { tempfilter.push(filtered[i]) }
            }
            filtered = tempfilter
        }
    }
    if (filter.floatcheck == 'floatcheck') {
        if (filter.floatfilter) {
            let tempfilter = []
            for (let i = 0; i < filtered.length; i++) {
                if (filtered[i].floatdb == filter.floatfilter) { tempfilter.push(filtered[i]) }
            }
            filtered = tempfilter
        }
    }
    if (filter.datecheck == 'datecheck') {
        if (filter.datefilter) {
            if (filter.datefilter2) {
                let tempfilter = []
                for (let i = 0; i < filtered.length; i++) {
                    if (new Date(filtered[i].datedb) >= new Date(filter.datefilter) && new Date(filtered[i].datedb) <= new Date(filter.datefilter2)) { tempfilter.push(filtered[i]) }
                }
                filtered = tempfilter
            } else {
                let tempfilter = []
                for (let i = 0; i < filtered.length; i++) {
                    if (new Date(filtered[i].datedb) >= new Date(filter.datefilter)) { tempfilter.push(filtered[i]) }
                }
                filtered = tempfilter
            }
        } else if (filter.datefilter2) {
            let tempfilter = []
            for (let i = 0; i < filtered.length; i++) {
                if (new Date(filtered[i].datedb) <= new Date(filter.datefilter2)) { tempfilter.push(filtered[i]) }
            }
            filtered = tempfilter
        }
    }
    if (filter.booleancheck == 'booleancheck') {
        if (filter.booleanfilter) {
            let tempfilter = []
            for (let i = 0; i < filtered.length; i++) {
                if (filtered[i].booleandb == filter.booleanfilter) { tempfilter.push(filtered[i]) }
            }
            filtered = tempfilter
        }
    }
    data = filtered;
    console.log(data)
    let url = req._parsedUrl.query
    let urlstring = `${url}`
    let urls = urlstring.split("=")
    if (urls[0] == "page") { url = "" }
    if (urls[0] == "IDfilter" && urls[urls.length - 2].includes("page")) {
        let urln = urlstring.split("&")
        urln.pop()
        url = urln.join("&") + "&"
    }
    else if (urls[0] == "IDfilter") { url += "&" }

    let totalpage = Math.ceil(data.length / 3)
    let pageno = req.query.page ? Number(req.query.page) : 1
    let offset = 3 * (pageno - 1)
    let data2 = data.slice(offset, offset + 3)
    res.render('index', { data: data2, totalpage, currentpage: pageno, offset, filter, url })
})
app.get('/add', function (req, res) {
    res.render('add')
})

app.post('/add', function (req, res) { //nerima tembakan
    let add = req.body;
    add.integerdb = parseInt(add.integerdb)
    add.floatdb = parseFloat(add.floatdb)
    data.push(add)
    let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
        if (err) throw err;
        db.serialize(function () {
            let sql = `INSERT INTO bread (stringdb, integerdb, floatdb, datedb, booleandb) values('${add.stringdb}', ${add.integerdb}, ${add.floatdb}, '${add.datedb}', '${add.booleandb}'); `;
            db.run(sql, (err) => {
                if (err) throw err;
            });
        });
        db.close();
    });
    res.redirect('/')
})

app.get('/edit', function (req, res) {
    res.render('edit')
})
app.get('/delete/:id', function (req, res) {
    const id = Number(req.params.id)
    data.splice(id, 1)
    let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
        if (err) throw err;
        db.serialize(function () {
            let sql = `DELETE FROM bread WHERE id = ${id + 1} `;
            db.run(sql, (err) => {
                if (err) throw err;
            });
        });
        db.close();
    });
    res.redirect('/')
})
app.get('/edit/:id', function (req, res) {
    let id = Number(req.params.id)
    let edit = data[id]
    res.render('edit', { edit, id })
})

app.post('/edit/:id', function (req, res) { //nerima tembakan
    let id = Number(req.params.id)
    let edit = req.body
    edit.integerdb = parseInt(edit.integerdb)
    edit.floatdb = parseFloat(edit.floatdb)
    data[id] = edit
    let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
        if (err) throw err;
        db.serialize(function () {
            let sql = `UPDATE bread SET stringdb = '${edit.stringdb}', integerdb = ${edit.integerdb}, floatdb = ${edit.floatdb}, datedb = '${edit.datedb}', booleandb =  '${edit.booleandb}' WHERE id = ${id + 1}; `;
            db.run(sql, (err) => {
                if (err) throw err;
            });
        });
        db.close();
    });
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`aplikasi berjalan di port ${port}`)
})
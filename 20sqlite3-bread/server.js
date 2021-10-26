const fs = require('fs');

let datajson = fs.readFileSync('data.json', 'utf-8');
// let dataraw = JSON.parse(datajson);
// let data = dataraw;
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

    filter = req.query
    console.log(filter)
    if (filter.IDcheck == 'IDcheck' || filter.stringcheck == 'stringcheck' || filter.integercheck == 'integercheck' || filter.floatcheck == 'floatcheck' || filter.datecheck == 'datecheck' || filter.booleancheck == 'booleancheck') {
        console.log("hadir")
        if (filter.IDcheck == 'IDcheck') {
            let i = Number(filter.IDfilter)
            let a = data[i - 1]
            data = []
            data.push(a)
        }
        data = data.filter(filtering)
        function filtering(f) {
            if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.stringdb == filter.stringfilter && f.integerdb == filter.integerfilter && f.floatdb == filter.floatfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) && f.booleandb == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck') { return f.stringdb == filter.stringfilter && f.integerdb == filter.integerfilter && f.floatdb == filter.floatfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.booleancheck == 'booleancheck') { return f.stringdb == filter.stringfilter && f.integerdb == filter.integerfilter && f.floatdb == filter.floatfilter && f.booleandb == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.stringdb == filter.stringfilter && f.floatdb == filter.floatfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) && f.booleandb == filter.booleanfilter }
            else if (filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.integerdb == filter.integerfilter && f.floatdb == filter.floatfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) && f.booleandb == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck') { return f.stringdb == filter.stringfilter && f.integerdb == filter.integerfilter && f.floatdb == filter.floatfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.datecheck == 'datecheck') { return f.stringdb == filter.stringfilter && f.integerdb == filter.integerfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.booleancheck == 'booleancheck') { return f.stringdb == filter.stringfilter && f.integerdb == filter.integerfilter && f.stringdb == filter.stringfilter && f.booleandb == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck') { return f.stringdb == filter.stringfilter && f.floatdb == filter.floatfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) }
            else if (filter.stringcheck == 'stringcheck' && filter.floatcheck == 'floatcheck' && filter.booleancheck == 'booleancheck') { return f.stringdb == filter.stringfilter && f.floatdb == filter.floatfilter && f.stringdb == filter.stringfilter && f.booleandb == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.stringdb == filter.stringfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) && f.stringdb == filter.stringfilter && f.booleandb == filter.booleanfilter }
            else if (filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck') { return f.integerdb == filter.integerfilter && f.floatdb == filter.floatfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) }
            else if (filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.booleancheck == 'booleancheck') { return f.integerdb == filter.integerfilter && f.floatdb == filter.floatfilter && f.booleandb == filter.booleanfilter }
            else if (filter.integercheck == 'integercheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.integerdb == filter.integerfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) && f.booleandb == filter.booleanfilter }
            else if (filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.floatdb == filter.floatfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) && f.booleandb == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck') { return f.stringdb == filter.stringfilter && f.integerdb == filter.integerfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.floatcheck == 'floatcheck') { return f.stringdb == filter.stringfilter && f.floatdb == filter.floatfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.datecheck == 'datecheck') { return f.stringdb == filter.stringfilter && new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) }
            else if (filter.stringcheck == 'stringcheck' && filter.booleancheck == 'booleancheck') { return f.stringdb == filter.stringfilter && f.booleandb == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck') { return f.stringdb == filter.stringfilter }
            else if (filter.integercheck == 'integercheck') { return f.integerdb == filter.integerfilter }
            else if (filter.floatcheck == 'floatcheck') { return f.floatdb == filter.floatfilter }
            else if (filter.datecheck == 'datecheck') { return new Date(f.datedb) >= new Date(filter.datefilter) && new Date(f.datedb) <= new Date(filter.datefilter2) }
            else if (filter.booleancheck == 'booleancheck') { return f.booleandb == filter.booleanfilter }
            else { return f }
        }
    }
    else { data = dataraw }

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
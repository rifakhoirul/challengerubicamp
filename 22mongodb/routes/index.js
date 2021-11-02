const Router = require('express-promise-router')
const router = new Router()

const db = require('../db')

let data = [];
let dataRaw = [];
let dataIdDesc = [];
let dataStringAsc = [];
let dataStringDesc = [];
let dataIntegerAsc = [];
let dataIntegerDesc = [];
let dataFloatAsc = [];
let dataFloatDesc = [];
let dataDateAsc = [];
let dataDateDesc = [];
let dataBooleanAsc = [];
let dataBooleanDesc = [];

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const urlm = "mongodb://localhost:27017/";

MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find({}).toArray(function (err, result) {
        if (err) throw err;
        dataRaw = result
    })
});
//kumpulin
MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ _id: -1 }).toArray(function (err, result) {
        if (err) throw err;
        dataIdDesc = result
    })
});
MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ stringdb: 1 }).toArray(function (err, result) {
        if (err) throw err;
        dataStringAsc = result
    })
});
MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ stringdb: -1 }).toArray(function (err, result) {
        if (err) throw err;
        dataStringDesc = result
    })
});
MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ integerdb: 1 }).toArray(function (err, result) {
        if (err) throw err;
        dataIntegerAsc = result
    })
});
MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ integerdb: -1 }).toArray(function (err, result) {
        if (err) throw err;
        dataIntegerDesc = result
    })
});
MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ floatdb: 1 }).toArray(function (err, result) {
        if (err) throw err;
        dataFloatAsc = result
    })
});

MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ floatdb: -1 }).toArray(function (err, result) {
        if (err) throw err;
        dataFloatDesc = result
    })
});
MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ datedb: 1 }).toArray(function (err, result) {
        if (err) throw err;
        dataDateAsc = result
    })
});
MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ datedb: -1 }).toArray(function (err, result) {
        if (err) throw err;
        dataDateDesc = result
    })
});
MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ booleandb: 1 }).toArray(function (err, result) {
        if (err) throw err;
        dataBooleanAsc = result
    })
});

MongoClient.connect(urlm, function (err, dbs) {
    if (err) throw err;
    let dbo = dbs.db("challenge");
    dbo.collection("c22").find().sort({ booleandesc: -1 }).toArray(function (err, result) {
        if (err) throw err;
        dataBooleanDesc = result
        console.log(result)
    })
});


router.get('/', async function (req, res) {
    data = dataRaw
    let sort = req.query
    let filter = req.query
    let filtered = []

    if (sort.idasc == '') {
        data = dataRaw
    }
    if (sort.iddesc == '') {
        data = dataIdDesc
    }
    if (sort.stringasc == '') {
        data = dataStringAsc
    }
    if (sort.stringdesc == '') {
        data = dataStringDesc
    }
    if (sort.integerasc == '') {
        data = dataIntegerAsc
    }
    if (sort.integerdesc == '') {
        data = dataIntegerDesc
    }
    if (sort.floatasc == '') {
        data = dataFloatAsc
    }
    if (sort.floatdesc == '') {
        data = dataFloatDesc
    }
    if (sort.dateasc == '') {
        data = dataDateAsc
    }
    if (sort.datedesc == '') {
        data = dataDateDesc
    }
    if (sort.booleanasc == '') {
        data = dataBooleanAsc
    }
    if (sort.booleandesc == '') {
        data = dataBooleanDesc
    }
    
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
                if (`${filtered[i].booleandb}` == `${filter.booleanfilter}`) { tempfilter.push(filtered[i]) }
            }
            filtered = tempfilter
        }
    }
    data = filtered;
    let url = req._parsedUrl.query
    let urlstring = `${url}`

    let urls = urlstring.split("=")
    if (urls[0] == "page") { url = "" }

    let urlt = urls[0].split("&")
    if (urlt[1] == '') {
        url = ""
    }

    if (urlt[1] == "page") {
        urlt[1] = ""
        url = urlt.join("&")
    }

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

router.get('/add', function (req, res) {
    res.render('add')
})

router.post('/add', function (req, res) {
    let add = req.body;
    add.integerdb = parseInt(add.integerdb)
    add.floatdb = parseFloat(add.floatdb)
    
    // db.query(`INSERT INTO c21 (stringdb, integerdb, floatdb, datedb, booleandb) values('${add.stringdb}', ${add.integerdb}, ${add.floatdb}, '${add.datedb}', '${add.booleandb}'); `, (err, res) => {
    // })
    res.redirect('/')
})
router.get('/delete/:id', function (req, res) {
    const id = Number(req.params.id)
    // db.query(`DELETE FROM c21 WHERE id = ${id} `, (err, res) => {
    // })
    res.redirect('/')
})

router.get('/edit/:id', function (req, res) {
    let id = Number(req.params.id)
    let edit = data[id]
    res.render('edit', { edit, id })
})

router.post('/edit/:id', function (req, res) {
    let id = Number(req.params.id)
    let edit = req.body
    edit.integerdb = parseInt(edit.integerdb)
    edit.floatdb = parseFloat(edit.floatdb)
    data[id] = edit
    // db.query(`UPDATE c21 SET stringdb = '${edit.stringdb}', integerdb = ${edit.integerdb}, floatdb = ${edit.floatdb}, datedb = '${edit.datedb}', booleandb =  '${edit.booleandb}' WHERE id = ${id + 1}; `, (err, res) => {
    // })
    res.redirect('/')
})

module.exports = router;
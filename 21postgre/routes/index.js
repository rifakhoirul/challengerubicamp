const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()
let data = [];

router.get('/', async function (req, res) {
    let { rows } = await db.query('SELECT * FROM c21')
    data = rows
    dateFix(data)

    let sort = req.query
    let filter = req.query
    let filtered = []

    if (sort.idasc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY id ASC')
        data = rows
        dateFix(data)
    }
    if (sort.iddesc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY id DESC')
        data = rows
        dateFix(data)
    }
    if (sort.stringasc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY stringdb ASC')
        data = rows
        dateFix(data)
    }
    if (sort.stringdesc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY stringdb DESC')
        data = rows
        dateFix(data)
    }
    if (sort.integerasc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY integerdb ASC')
        data = rows
        dateFix(data)
    }
    if (sort.integerdesc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY integerdb DESC')
        data = rows
        dateFix(data)
    }
    if (sort.floatasc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY floatdb ASC')
        data = rows
        dateFix(data)
    }
    if (sort.floatdesc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY floatdb DESC')
        data = rows
        dateFix(data)
    }
    if (sort.dateasc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY datedb ASC')
        data = rows
        dateFix(data)
    }
    if (sort.datedesc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY datedb DESC')
        data = rows
        dateFix(data)
    }
    if (sort.booleanasc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY booleandb ASC')
        data = rows
        dateFix(data)
    }
    if (sort.booleandesc == '') {
        let { rows } = await db.query('SELECT * FROM c21 ORDER BY booleandb DESC')
        data = rows
        dateFix(data)
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
    let urlt = urls[0].split("&")

    if (urls[0] == "page") { url = "" }

    if (urlt[1] == "page") {
        urlt[1] = ""
        url = urlt.join("&")
    } 
    // if (urlt[1] == '') {
    //     url = ""
    // }
    if (urls[0] == "IDfilter" && urls[urls.length - 2].includes("page")) {
        let urln = urlstring.split("&")
        urln.pop()
        url = urln.join("&") + "&"
    } else if (urls[0] == "IDfilter") { url += "&" }

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
    db.query(`INSERT INTO c21 (stringdb, integerdb, floatdb, datedb, booleandb) values('${add.stringdb}', ${add.integerdb}, ${add.floatdb}, '${add.datedb}', '${add.booleandb}'); `, (err, res) => {
    })
    res.redirect('/')
})
router.get('/delete/:id', function (req, res) {
    const id = Number(req.params.id)
    db.query(`DELETE FROM c21 WHERE id = ${id} `, (err, res) => {
    })
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
    db.query(`UPDATE c21 SET stringdb = '${edit.stringdb}', integerdb = ${edit.integerdb}, floatdb = ${edit.floatdb}, datedb = '${edit.datedb}', booleandb =  '${edit.booleandb}' WHERE id = ${id + 1}; `, (err, res) => {
    })
    res.redirect('/')
})

function dateFix(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].datedb = data[i].datedb.toLocaleString()
        let a = data[i].datedb.split(",")
        let b = a[0].split('/')
        let c = [b[2], b[1], b[0]]
        let d = c.join('-')
        data[i].datedb = d
    }
    return data;
}

module.exports = router;
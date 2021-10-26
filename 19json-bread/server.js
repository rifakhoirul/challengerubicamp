const fs = require('fs')
let datajson = fs.readFileSync('data.json', 'utf-8')
let dataraw = JSON.parse(datajson)
let data = dataraw
let filter = {}

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const port = 9000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    filter = req.query
    if (filter.IDcheck == 'IDcheck' || filter.stringcheck == 'stringcheck' || filter.integercheck == 'integercheck' || filter.floatcheck == 'floatcheck' || filter.datecheck == 'datecheck' || filter.booleancheck == 'booleancheck') {
        if (filter.IDcheck == 'IDcheck') {
            let i = parseInt(filter.IDfilter)
            let a = data[i - 1]
            data = []
            data.push(a)
        }
        data = data.filter(filtering)
        function filtering(f) {
            if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.string == filter.stringfilter && f.integer == filter.integerfilter && f.float == filter.floatfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) && f.boolean == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck') { return f.string == filter.stringfilter && f.integer == filter.integerfilter && f.float == filter.floatfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.booleancheck == 'booleancheck') { return f.string == filter.stringfilter && f.integer == filter.integerfilter && f.float == filter.floatfilter && f.boolean == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.string == filter.stringfilter && f.float == filter.floatfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) && f.boolean == filter.booleanfilter }
            else if (filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.integer == filter.integerfilter && f.float == filter.floatfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) && f.boolean == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck') { return f.string == filter.stringfilter && f.integer == filter.integerfilter && f.float == filter.floatfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.datecheck == 'datecheck') { return f.string == filter.stringfilter && f.integer == filter.integerfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck' && filter.booleancheck == 'booleancheck') { return f.string == filter.stringfilter && f.integer == filter.integerfilter && f.string == filter.stringfilter && f.boolean == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck') { return f.string == filter.stringfilter && f.float == filter.floatfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) }
            else if (filter.stringcheck == 'stringcheck' && filter.floatcheck == 'floatcheck' && filter.booleancheck == 'booleancheck') { return f.string == filter.stringfilter && f.float == filter.floatfilter && f.string == filter.stringfilter && f.boolean == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.string == filter.stringfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) && f.string == filter.stringfilter && f.boolean == filter.booleanfilter }
            else if (filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck') { return f.integer == filter.integerfilter && f.float == filter.floatfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) }
            else if (filter.integercheck == 'integercheck' && filter.floatcheck == 'floatcheck' && filter.booleancheck == 'booleancheck') { return f.integer == filter.integerfilter && f.float == filter.floatfilter && f.boolean == filter.booleanfilter }
            else if (filter.integercheck == 'integercheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.integer == filter.integerfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) && f.boolean == filter.booleanfilter }
            else if (filter.floatcheck == 'floatcheck' && filter.datecheck == 'datecheck' && filter.booleancheck == 'booleancheck') { return f.float == filter.floatfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) && f.boolean == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.integercheck == 'integercheck') { return f.string == filter.stringfilter && f.integer == filter.integerfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.floatcheck == 'floatcheck') { return f.string == filter.stringfilter && f.float == filter.floatfilter }
            else if (filter.stringcheck == 'stringcheck' && filter.datecheck == 'datecheck') { return f.string == filter.stringfilter && new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) }
            else if (filter.stringcheck == 'stringcheck' && filter.booleancheck == 'booleancheck') { return f.string == filter.stringfilter && f.boolean == filter.booleanfilter }
            else if (filter.stringcheck == 'stringcheck') { return f.string == filter.stringfilter }
            else if (filter.integercheck == 'integercheck') { return f.integer == filter.integerfilter }
            else if (filter.floatcheck == 'floatcheck') { return f.float == filter.floatfilter }
            else if (filter.datecheck == 'datecheck') { return new Date(f.date) >= new Date(filter.datefilter) && new Date(f.date) <= new Date(filter.datefilter2) }
            else if (filter.booleancheck == 'booleancheck') { return f.boolean == filter.booleanfilter }
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
    data.push(req.body)
    datajson = JSON.stringify(data)
    fs.writeFileSync('data.json', datajson)
    res.redirect('/')
})

app.get('/edit', function (req, res) {
    res.render('edit')
})
app.get('/delete/:id', function (req, res) {
    const id = req.params.id //parameterr
    data.splice(id, 1)
    datajson = JSON.stringify(data)
    fs.writeFileSync('data.json', datajson)
    res.redirect('/')
})
app.get('/edit/:id', function (req, res) {
    let id = Number(req.params.id)
    let edit = data[id]
    res.render('edit', { edit, id })
})

app.post('/edit/:id', function (req, res) { //nerima tembakan
    let id = req.params.id
    data[id] = req.body
    datajson = JSON.stringify(data)
    fs.writeFileSync('data.json', datajson)
    res.redirect('/')
})


app.listen(port, () => {
    console.log(`aplikasi berjalan di port ${port}`)
})
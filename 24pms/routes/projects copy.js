const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();

function checkLogIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};

router.get('/', checkLogIn, async function (req, res, next) {
    let projectList = await db.query(`SELECT * FROM projects ORDER BY projectid`)
    let dataRaw = await db.query(`SELECT projects.projectid, projects.name, users.firstname FROM projects
        LEFT JOIN members ON projects.projectid = members.projectid
        LEFT JOIN users ON members.userid = users.userid ORDER BY projectid`)

    for (let j = 0; j < projectList.rows.length; j++) {
        let members = []
        for (let i = 0; dataRaw.rows[i].projectid <= projectList.rows[j].projectid;) {
            if (dataRaw.rows[i].projectid == projectList.rows[j].projectid) {
                members.push(dataRaw.rows[i].firstname);
            }
            i++
            if (!dataRaw.rows[i]) break;
        }
        projectList.rows[j].firstname = members.join(", ")
    }
    
    if (req.query.idCheckFilter) {
        if (req.query.idFilter != '') {
            projectList.rows = projectList.rows.filter((element) => {
                return element.projectid == Number(req.query.idFilter);
            })
        }
    }
    if (req.query.nameCheckFilter) {
        if (req.query.nameFilter != '') {
            projectList.rows = projectList.rows.filter((element) => {
                return element.name.includes(req.query.nameFilter);
            })
        }
    }
    if (req.query.memberCheckFilter) {
        if (req.query.memberFilter) {
            projectList.rows = projectList.rows.filter((element) => {
                return element.firstname.includes(req.query.memberFilter);
            })
        }
    }

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
    if (urls[0] == "idFilter" && urls[urls.length - 2].includes("page")) {
        let urln = urlstring.split("&")
        urln.pop()
        url = urln.join("&") + "&"
    } else if (urls[0] == "idFilter") { url += "&" }

    let totalPage = Math.ceil(projectList.rows.length / 3)
    let currentPage = req.query.page ? Number(req.query.page) : 1
    let offset = 3 * (currentPage - 1)
    let dataEachPage = projectList.rows.slice(offset, offset + 3)

    const users = await db.query(`SELECT firstname FROM users ORDER BY userid`)
    const setting = await db.query(`SELECT setting FROM users WHERE userid = 1;`)
    res.render('projects/list', {
        data: dataEachPage,
        option: req.query,
        members: users.rows,
        totalPage,
        currentPage,
        offset,
        url,
        setting: setting.rows[0].setting,
    });
});

router.post('/saveoption', checkLogIn, async function (req, res, next) {
    let setting = {
        idOption: req.body.idOption,
        nameOption: req.body.nameOption,
        memberOption: req.body.memberOption
    }
    setting = JSON.stringify(setting)
    db.query(`UPDATE users SET setting ='${setting}' WHERE userid = 1;`, (err, res) => {
        if (err) return console.log(err)
    })
    res.redirect('/projects');
});

router.get('/add', checkLogIn, async function (req, res, next) {
    const users = await db.query(`SELECT firstname FROM users`)
    let projectName, projectMembers;
    res.render('projects/form', {
        members: users.rows,
        projectName,
        projectMembers,
    });
});

router.post('/add', checkLogIn, async function (req, res, next) {
    const insertProject = await db.query(`INSERT INTO projects (name) 
        VALUES('${req.body.projectName}');`, (err, res) => { })
    let users = await db.query(`SELECT userid, firstname, position FROM users`)
    let projects = await db.query(`SELECT projectid, name FROM projects`)

    let projectMembers = req.body.projectMembers
    if (typeof (projectMembers) == 'string') {
        projectMembers = [projectMembers]
    }
    if (req.body.projectMembers) {
        for (let i = 0; i < projectMembers.length; i++) {
            let member = users.rows.filter((element) => {
                return element.firstname == projectMembers[i];
            })
            let project = projects.rows.filter((element) => {
                return element.name == req.body.projectName;
            })
            db.query(`INSERT INTO members (userid, position, projectid) 
            VALUES(${member[0].userid},'${member[0].position}',${project[0].projectid});`, (err, res) => {
                if (err) console.log(err)
            })
        }
    }
    res.redirect('/projects');
});

router.get('/edit/:id', checkLogIn, async function (req, res, next) {
    let id = Number(req.params.id);
    let project = await db.query(`
    SELECT projects.projectid, projects.name, users.firstname FROM projects
    LEFT JOIN members ON projects.projectid = members.projectid
    LEFT JOIN users ON members.userid = users.userid
    WHERE projects.projectid = ${id}
    `)
    let members = []
    for (let i = 0; i < project.rows.length; i++) {
        members.push(project.rows[i].firstname)
    }

    const users = await db.query(`SELECT firstname FROM users`)

    res.render('projects/formEdit', {
        members: users.rows,
        projectName: project.rows[0].name,
        projectMembers: members,
    });
});

router.post('/edit/:id', checkLogIn, async function (req, res, next) {
    let id = Number(req.params.id)
    const editProject = await db.query(`UPDATE projects SET name ='${req.body.projectName}' 
    WHERE projectid = ${id};`, (err, res) => { })
    const deleteMembers = await db.query(`DELETE FROM members WHERE projectid = ${id};`, (err, res) => { })

    let users = await db.query(`SELECT userid, firstname, position FROM users`)
    let projectMembers = req.body.projectMembers
    if (typeof (projectMembers) == 'string') {
        projectMembers = [projectMembers]
    }
    if (req.body.projectMembers) {
        for (let i = 0; i < projectMembers.length; i++) {
            let member = users.rows.filter((element) => {
                return element.firstname == projectMembers[i];
            })
            const update = await db.query(`INSERT INTO members (userid, position, projectid) 
            VALUES(${member[0].userid},'${member[0].position}',${id});`, (err, res) => {
                if (err) console.log(err)

            })
        }
    }
    res.redirect('/projects');
});

router.get('/delete/:id', checkLogIn, function (req, res, next) {
    const id = Number(req.params.id)
    db.query(`DELETE FROM members WHERE projectid = ${id} `, (err, res) => { })
    db.query(`DELETE FROM projects WHERE projectid = ${id} `, (err, res) => { })
    res.redirect('/projects');
});

//overview
router.get('/overview/:projectid', checkLogIn, async function (req, res, next) {
    const bugTotal = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='bug'`)
    const bugOpen = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='bug' AND status != 'Closed'`)
    const featureTotal = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='feature'`)
    const featureOpen = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='feature' AND status != 'Closed'`)
    const supportTotal = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='support'`)
    const supportOpen = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='support' AND status != 'Closed'`)
    const members = await db.query(`SELECT users.firstname FROM users 
        LEFT JOIN members ON users.userid = members.userid WHERE members.projectid = ${req.params.projectid}`)
    res.render('projects/overview/view', {
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
        bugTotal: bugTotal.rows.length,
        bugOpen: bugOpen.rows.length,
        featureTotal: featureTotal.rows.length,
        featureOpen: featureOpen.rows.length,
        supportTotal: supportTotal.rows.length,
        supportOpen: supportOpen.rows.length,
        members: members.rows,
    });
});

//activity
router.get('/activity/:projectid', checkLogIn, function (req, res, next) {
    res.render('projects/activity/view', {
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
    });
});

//members
router.get('/members/:projectid', checkLogIn, async function (req, res, next) {
    let querySyntax = `SELECT members.id, users.firstname, users.position FROM members 
    LEFT JOIN users ON members.userid = users.userid 
    WHERE members.projectid = ${req.params.projectid}`

    if (req.query.idCheckFilter) {
        if (req.query.idFilter != '') {
            querySyntax += `AND members.id = ${Number(req.query.idFilter)}`
        }
    }
    if (req.query.nameCheckFilter) {
        if (req.query.nameFilter != '') {
            querySyntax += `AND users.firstname LIKE '%${req.query.nameFilter}%'`
        }
    }
    if (req.query.positionCheckFilter) {
        if (req.query.positionFilter) {
            querySyntax += `AND users.position = '${req.query.positionFilter}'`
        }
    }

    if (req.query.id_asc == '') {
        querySyntax += 'ORDER BY members.id ASC'
    }
    if (req.query.id_desc == '') {
        querySyntax += 'ORDER BY members.id DESC'
    }
    if (req.query.name_asc == '') {
        querySyntax += 'ORDER BY users.firstname ASC'
    }
    if (req.query.name_desc == '') {
        querySyntax += 'ORDER BY users.firstname DESC'
    }
    if (req.query.position_asc == '') {
        querySyntax += 'ORDER BY users.position ASC'
    }
    if (req.query.position_desc == '') {
        querySyntax += 'ORDER BY users.position DESC'
    }

    let projectList = await db.query(querySyntax)

    if (!req._parsedUrl.query) { req._parsedUrl.query = '?' }
    let url = `${req._parsedUrl.query}`
    let bridge = ''

    //moving page only
    if (url.split('=')[0] == 'page') {
        url = '?'
    }
    //moving page with filter only
    if (url.split('=')[0] == 'idFilter') {
        url = '?' + url;
        url += '&';
    }
    if (url.split('=')[0] == '?idFilter' && String(url.split('=')[url.split('=').length - 2]).includes("page")) {
        url = url.split('&');
        url.pop(); url.pop();
        url = url.join('&') + '&'
    }
    //moving page with sort only
    if (url == 'id_asc' || url == 'id_desc' ||
        url == 'name_asc' || url == 'name_desc' ||
        url == 'position_asc' || url == 'position_desc') {
        url = '?' + url;
        bridge = "&"
    }
    if ((String(url.split('&')[0]).includes('asc') || String(url.split('&')[0]).includes('desc')) && String(url.split('&')[1]).includes('page')) {
        url = url.split('&')
        url.pop();
        url = '?' + url.join('&') + '&'
        console.log(url)
    }
    let urls = url.split('&')
    urls.pop(); urls.pop();
    urls = urls.join('&') + '&'

    let totalPage = Math.ceil(projectList.rows.length / 3)
    let currentPage = req.query.page ? Number(req.query.page) : 1
    let offset = 3 * (currentPage - 1)
    let dataEachPage = projectList.rows.slice(offset, offset + 3)

    const setting = await db.query(`SELECT setting FROM users WHERE userid = 2;`)
    res.render('projects/members/list', {
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
        option: req.query,
        setting: setting.rows[0].setting,
        data: dataEachPage,
        totalPage,
        currentPage,
        offset,
        url,
        bridge,
        urls,
    });
});

router.post('/members/:projectid/saveoption', checkLogIn, async function (req, res, next) {
    let setting = {
        idOption: req.body.idOption,
        nameOption: req.body.nameOption,
        positionOption: req.body.positionOption
    }
    setting = JSON.stringify(setting)
    db.query(`UPDATE users SET setting ='${setting}' WHERE userid = 2;`, (err, res) => {
        if (err) return console.log(err)
    })
    res.redirect(`/projects/members/${req.params.projectid}`);
});

router.get('/members/:projectid/add', checkLogIn, async function (req, res, next) {
    const selected = await db.query(`CREATE VIEW selected AS SELECT users.userid FROM users 
        LEFT JOIN members ON users.userid = members.userid WHERE members.projectid = ${req.params.projectid};`)
    const selectAvailable = await db.query(`SELECT DISTINCT users.userid, users.firstname FROM users 
        LEFT JOIN selected ON users.userid = selected.userid WHERE selected.userid IS NULL;`)
    const clearSelected = await db.query('DROP VIEW selected;')
    res.render('projects/members/form', {
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
        members: selectAvailable.rows,
    });
});

router.post('/members/:projectid/add', checkLogIn, async function (req, res, next) {
    const insertMembers = await db.query(`INSERT INTO members (userid, position, projectid)
        VALUES (${req.body.member},'${req.body.position}',${req.params.projectid});`)
    const updateUsers = await db.query(`UPDATE users SET position = '${req.body.position}' 
        WHERE userid = ${req.body.member};`)
    res.redirect(`/projects/members/${req.params.projectid}`);
});

router.get('/members/:projectid/edit/:memberid', checkLogIn, async function (req, res, next) {
    const member = await db.query(`SELECT members.userid, users.firstname, users.position FROM members 
    LEFT JOIN users ON members.userid = users.userid
    WHERE members.id=${req.params.memberid}`)
    res.render('projects/members/formEdit', {
        member: member.rows[0],
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
    });
});

router.post('/members/:projectid/edit/:memberid', checkLogIn, async function (req, res, next) {
    const updateMembers = await db.query(`UPDATE members SET position = '${req.body.position}' 
    WHERE id = ${req.params.memberid};`, (err, res) => {
        if (err) return console.log(err)
    })
    const selectMember = await db.query(`SELECT userid FROM members WHERE id =${req.params.memberid};`)
    const updateUsers = await db.query(`UPDATE users SET position = '${req.body.position}' 
    WHERE userid = ${selectMember.rows[0].userid};`, (err, res) => {
        if (err) return console.log(err)
    })
    res.redirect(`/projects/members/${req.params.projectid}`);
});

router.get('/members/:projectid/delete/:memberid', checkLogIn, async function (req, res, next) {
    const deleteMember = await db.query(`DELETE FROM members WHERE id = ${req.params.memberid}`)
    res.redirect(`/projects/members/${req.params.projectid}`);
});

//issues
router.get('/issues/:projectid', checkLogIn, function (req, res, next) {
    res.render('projects/issues/list', {
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
    });
});

router.get('/issues/:projectid/add', checkLogIn, function (req, res, next) {
    res.render('/projects/issues/form', {
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
    });
});

router.post('/issues/:projectid/add', checkLogIn, function (req, res, next) {
    res.redirect(`/projects/issues/${req.params.projectid}`);
});

router.get('/issues/:projectid/edit/:issueid', checkLogIn, function (req, res, next) {
    res.render('projects/issues/form', {
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
    });
});

router.post('/issues/:projectid/edit/:issueid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

router.get('/issues/:projectid/delete/:issueid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

module.exports = router;
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
    LEFT JOIN users ON members.userid = users.userid
    ORDER BY projectid`)

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
    let setting = await db.query(`SELECT setting FROM users WHERE userid = 1;`)
    setting = setting.rows[0].setting
    res.render('projects/list', {
        data: dataEachPage,
        option: req.query,
        members: users.rows,
        totalPage,
        currentPage,
        offset,
        url,
        setting
    });
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
    const insertProject = await db.query(`INSERT INTO projects (name) VALUES('${req.body.projectName}');`, (err, res) => {
    })
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
            db.query(`INSERT INTO members (userid, position, projectid) VALUES(${member[0].userid},'${member[0].position}',${project[0].projectid});`, (err, res) => {
                if (err) console.log(err)
            })
        }
    }
    res.redirect('/projects');
});

router.post('/saveoption', checkLogIn, async function (req, res, next) {
    let setting = { idOption: req.body.idOption, nameOption: req.body.nameOption, memberOption: req.body.memberOption }
    setting = JSON.stringify(setting)
    db.query(`UPDATE users SET setting ='${setting}' WHERE userid = 1;`, (err, res) => {
        if (err) return console.log(err)
    })
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
    const editProject = await db.query(`UPDATE projects SET name ='${req.body.projectName}' WHERE projectid = ${id};`, (err, res) => {
    })
    const deleteMembers = await db.query(`DELETE FROM members WHERE projectid = ${id};`, (err, res) => {
    })

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
            const update = await db.query(`INSERT INTO members (userid, position, projectid) VALUES(${member[0].userid},'${member[0].position}',${id});`, (err, res) => {
                if (err) console.log(err)

            })
        }
    }
    res.redirect('/projects');
});

router.get('/delete/:id', checkLogIn, function (req, res, next) {
    const id = Number(req.params.id)
    db.query(`DELETE FROM members WHERE projectid = ${id} `, (err, res) => {
    })
    db.query(`DELETE FROM projects WHERE projectid = ${id} `, (err, res) => {
    })
    res.redirect('/projects');
});

//overview
router.get('/overview/:projectid', checkLogIn, function (req, res, next) {
    console.log('a')
    res.render('projects/overview/view');
});

//activity
router.get('/activity/:projectid', checkLogIn, function (req, res, next) {
    res.render('projects/activity /view');
});

//members
router.get('/members/:projectid', checkLogIn, function (req, res, next) {
    res.render('projects/list');
});

router.get('/members/:projectid/add', checkLogIn, function (req, res, next) {
    res.render('/projects/form');
});

router.post('/members/:projectid/add', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

router.get('/members/:projectid/edit/:memberid', checkLogIn, function (req, res, next) {
    res.render('projects/form');
});

router.post('/members/:projectid/edit/:memberid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

router.get('/members/:projectid/delete/:memberid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

//issues
router.get('/issues/:projectid', checkLogIn, function (req, res, next) {
    res.render('projects/list');
});

router.get('/issues/:projectid/add', checkLogIn, function (req, res, next) {
    res.render('/projects/form');
});

router.post('/issues/:projectid/add', checkLogIn, function (req, res, next) {
    res.redirect(`/projects/issues/${req.params.projectid}`);
});

router.get('/issues/:projectid/edit/:issueid', checkLogIn, function (req, res, next) {
    res.render('projects/form');
});

router.post('/issues/:projectid/edit/:issueid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

router.get('/issues/:projectid/delete/:issueid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

module.exports = router;
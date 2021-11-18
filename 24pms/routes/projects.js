const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();
const path = require('path');
const fs = require('fs');
const moment = require('moment');
var _ = require('underscore');

router.get('/', checkLogIn, async function (req, res, next) {
    let querySyntax = `SELECT * FROM projects`
    let querySyntax2 = `SELECT projects.projectid, projects.name, users.firstname FROM projects
        LEFT JOIN members ON projects.projectid = members.projectid
        LEFT JOIN users ON members.userid = users.userid ORDER BY projects.projectid`

    if (req.query.idCheckFilter) {
        if (req.query.idFilter != '') {
            querySyntax += ` WHERE projectid = ${Number(req.query.idFilter)}`
        }
    }
    if (req.query.nameCheckFilter) {
        if (req.query.nameFilter != '') {
            if (req.query.idCheckFilter && req.query.idFilter != '') {
                querySyntax += ` AND name LIKE '%${req.query.nameFilter}%'`
            } else { querySyntax += ` WHERE name LIKE '%${req.query.nameFilter}%'` }
        }
    }
    if (req.query.id_asc == '') { querySyntax += ' ORDER BY projectid ASC' }
    else if (req.query.id_desc == '') { querySyntax += ' ORDER BY projectid DESC' }
    else if (req.query.name_asc == '') { querySyntax += ' ORDER BY name ASC' }
    else if (req.query.name_desc == '') { querySyntax += ' ORDER BY name DESC' }
    else { querySyntax += ' ORDER BY projectid ASC' }

    let projectList = await db.query(querySyntax)
    let dataRaw = await db.query(querySyntax2)

    for (let j = 0; j < projectList.rows.length; j++) {
        let members = []
        for (let i = 0; dataRaw.rows[i].projectid <= projectList.rows[j].projectid;) {
            if (dataRaw.rows[i].projectid == projectList.rows[j].projectid) {
                members.push(dataRaw.rows[i].firstname);
            }
            i++
            if (!dataRaw.rows[i]) break;
        }
        members.sort()
        projectList.rows[j].firstname = members.join(", ")
    }
    if (req.query.memberCheckFilter) {
        if (req.query.memberFilter) {
            projectList.rows = projectList.rows.filter((element) => {
                return element.firstname.includes(req.query.memberFilter);
            })
        }
    }

    if (req.query.members_asc == '') {
        projectList.rows.sort()
    }
    else if (req.query.members_desc == '') {
        projectList.rows.sort().reverse()
    }

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
        url == 'members_asc' || url == 'members_desc') {
        url = '?' + url;
        bridge = "&"
    }
    if ((String(url.split('&')[0]).includes('asc') || String(url.split('&')[0]).includes('desc')) && String(url.split('&')[1]).includes('page')) {
        url = url.split('&')
        url.pop();
        url = '?' + url.join('&') + '&'
    }
    let urls = url.split('&')
    urls.pop(); urls.pop();
    urls = urls.join('&') + '&'

    let totalPage = Math.ceil(projectList.rows.length / 3)
    let currentPage = req.query.page ? Number(req.query.page) : 1
    let offset = 3 * (currentPage - 1)
    let dataEachPage = projectList.rows.slice(offset, offset + 3)

    const users = await db.query(`SELECT firstname FROM users ORDER BY userid`)
    const setting = await db.query(`SELECT setting FROM users WHERE userid = 1;`)
    res.render('projects/list', {
        title: 'Projects',
        data: dataEachPage,
        option: req.query,
        members: users.rows,
        totalPage,
        currentPage,
        offset,
        url,
        bridge,
        urls,
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
        if (err) return res.send(err)
    })
    res.redirect('/projects');
});

router.get('/add', checkLogIn, async function (req, res, next) {
    const users = await db.query(`SELECT firstname FROM users`)
    let projectName, projectMembers;
    res.render('projects/form', {
        title: 'Add Member',
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
                if (err) res.send(err)
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
        title: 'Edit Project',
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
                if (err) res.send(err)

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
        WHERE projectid = ${req.params.projectid} AND tracker='Bug'`)
    const bugOpen = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='Bug' AND status != 'Closed'`)
    const featureTotal = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='Feature'`)
    const featureOpen = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='Feature' AND status != 'Closed'`)
    const supportTotal = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='Support'`)
    const supportOpen = await db.query(`SELECT issueid FROM issues 
        WHERE projectid = ${req.params.projectid} AND tracker='Support' AND status != 'Closed'`)
    const members = await db.query(`SELECT users.firstname FROM users 
        LEFT JOIN members ON users.userid = members.userid WHERE members.projectid = ${req.params.projectid}`)
    res.render('projects/overview/view', {
        title: 'Overview',
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
router.get('/activity/:projectid', checkLogIn, async function (req, res, next) {
    let activity = await db.query(`SELECT activity.title, activity.description, activity.time, activity.issueid, users.firstname 
        FROM activity LEFT JOIN users ON activity.author = users.userid WHERE activity.time>$1 ORDER BY activity.time DESC`,
        [moment().subtract(10, 'days').format('YYYY-MM-DD')])
    activity.rows.forEach(element => {
        element.hour = moment(element.time).format('HH:mm')
    });
    let groupActivity = _.groupBy(activity.rows, function (data) {
        return moment(data.time).format('dddd')
    })
    console.log(groupActivity)
    res.render('projects/activity/view', {
        title: 'Activity',
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
        pastWeek: moment().subtract(7, 'days').calendar(),
        today: moment().format('L'),
        daytoday: moment().format('dddd'),
        groupActivity,
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
        title: 'Members',
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
        if (err) return res.send(err)
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
        title: 'Add Member',
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
        title: 'Edit Member',
        member: member.rows[0],
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
    });
});

router.post('/members/:projectid/edit/:memberid', checkLogIn, async function (req, res, next) {
    const updateMembers = await db.query(`UPDATE members SET position = '${req.body.position}' 
        WHERE id = ${req.params.memberid};`, (err, res) => {
        if (err) return res.send(err)
    })
    const selectMember = await db.query(`SELECT userid FROM members WHERE id =${req.params.memberid};`)
    const updateUsers = await db.query(`UPDATE users SET position = '${req.body.position}' 
        WHERE userid = ${selectMember.rows[0].userid};`, (err, res) => {
        if (err) return res.send(err)
    })
    res.redirect(`/projects/members/${req.params.projectid}`);
});

router.get('/members/:projectid/delete/:memberid', checkLogIn, async function (req, res, next) {
    const deleteMember = await db.query(`DELETE FROM members WHERE id = ${req.params.memberid}`)
    res.redirect(`/projects/members/${req.params.projectid}`);
});

//issues
router.get('/issues/:projectid', checkLogIn, async function (req, res, next) {
    let querySyntax = `SELECT issueid, subject, tracker FROM issues 
        WHERE projectid = ${req.params.projectid}`

    if (req.query.issueidCheckFilter) {
        if (req.query.issueidFilter != '') {
            querySyntax += ` AND issueid = ${Number(req.query.issueidFilter)}`
        }
    }
    if (req.query.subjectCheckFilter) {
        if (req.query.subjectFilter != '') {
            querySyntax += `AND subject LIKE '%${req.query.subjectFilter}%'`
        }
    }
    if (req.query.trackerCheckFilter) {
        if (req.query.trackerFilter) {
            querySyntax += `AND tracker = '${req.query.trackerFilter}'`
        }
    }

    if (req.query.issueid_asc == '') { querySyntax += 'ORDER BY issueid ASC' }
    else if (req.query.issueid_desc == '') { querySyntax += 'ORDER BY issueid DESC' }
    else if (req.query.subject_asc == '') { querySyntax += 'ORDER BY subject ASC' }
    else if (req.query.subject_desc == '') { querySyntax += 'ORDER BY subject DESC' }
    else if (req.query.tracker_asc == '') { querySyntax += 'ORDER BY tracker ASC' }
    else if (req.query.tracker_desc == '') { querySyntax += 'ORDER BY tracker DESC' }
    else { querySyntax += 'ORDER BY issueid ASC' }

    let issueList = await db.query(querySyntax)

    if (!req._parsedUrl.query) { req._parsedUrl.query = '?' }
    let url = `${req._parsedUrl.query}`
    let bridge = ''
    //moving page only
    if (url.split('=')[0] == 'page') {
        url = '?'
    }
    //moving page with filter only
    if (url.split('=')[0] == 'issueidFilter') {
        url = '?' + url;
        url += '&';
    }
    if (url.split('=')[0] == '?issueidFilter' && String(url.split('=')[url.split('=').length - 2]).includes("page")) {
        url = url.split('&');
        url.pop(); url.pop();
        url = url.join('&') + '&'
    }
    //moving page with sort only
    if (url == 'issueid_asc' || url == 'issueid_desc' ||
        url == 'subject_asc' || url == 'subject_desc' ||
        url == 'tracker_asc' || url == 'tracker_desc') {
        url = '?' + url;
        bridge = "&"
    }
    if ((String(url.split('&')[0]).includes('asc') || String(url.split('&')[0]).includes('desc')) && String(url.split('&')[1]).includes('page')) {
        url = url.split('&')
        url.pop();
        url = '?' + url.join('&') + '&'
    }
    let urls = url.split('&')
    urls.pop(); urls.pop();
    urls = urls.join('&') + '&'

    let totalPage = Math.ceil(issueList.rows.length / 3)
    let currentPage = req.query.page ? Number(req.query.page) : 1
    let offset = 3 * (currentPage - 1)
    let dataEachPage = issueList.rows.slice(offset, offset + 3)

    const setting = await db.query(`SELECT setting FROM users WHERE userid = 3;`)

    res.render('projects/issues/list', {
        title: 'Issues',
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

router.post('/issues/:projectid/saveoption', checkLogIn, async function (req, res, next) {
    let setting = {
        issueidOption: req.body.issueidOption,
        subjectOption: req.body.subjectOption,
        trackerOption: req.body.trackerOption,
    }
    setting = JSON.stringify(setting)
    db.query(`UPDATE users SET setting ='${setting}' WHERE userid = 3;`, (err, res) => {
        if (err) return res.send(err)
    })
    res.redirect(`/projects/issues/${req.params.projectid}`);
});

router.get('/issues/:projectid/add', checkLogIn, async function (req, res, next) {
    const members = await db.query(`SELECT users.userid, users.firstname FROM members
        LEFT JOIN users ON members.userid = users.userid WHERE members.projectid = ${req.params.projectid}`)
    res.render('projects/issues/form', {
        title: 'Add Issue',
        sidebar: req.url.split('/')[1],
        projectid: req.params.projectid,
        members: members.rows,
    });
});

router.post('/issues/:projectid/add', checkLogIn, async function (req, res, next) {
    const createddate = await db.query('SELECT NOW()');
    let closeddate;
    if (req.body.status == 'Closed') closeddate = createddate.rows[0].now;
    if (req.body.estimatedtime == '') req.body.estimatedtime = null;

    let jsonFiles = [];
    if (!req.files || Object.keys(req.files).length === 0) {
        jsonFiles = null
    } else {
        for (let i = 0; i < Object.keys(req.files).length; i++) {
            let uploadFile = Object.values(req.files)[i];
            let fileName = Date.now() + uploadFile.name;
            let jsonFile = { name: fileName, type: uploadFile.mimetype, location: `/uploads/${fileName}` };
            jsonFiles.push(jsonFile);
            let uploadPath = path.join(__dirname, `../public/uploads/`) + fileName;
            uploadFile.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).send(err);
            });
        }
    }

    const insertIssue = await db.query(`INSERT INTO issues (projectid, tracker, subject, description, status, priority, 
        assignee, startdate, duedate, estimatedtime, done, files, createddate, author, updateddate, closeddate) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
        [req.params.projectid, req.body.tracker, req.body.subject, req.body.description, req.body.status, req.body.priority,
        req.body.assignee, req.body.startdate, req.body.duedate, req.body.estimatedtime, req.body.done, jsonFiles, createddate.rows[0].now, req.session.user.userid, createddate.rows[0].now, closeddate], (err, res) => {
            if (err) return res.send(err)
        })

    let issueid = await db.query(`SELECT issueid FROM issues WHERE projectid = ${req.params.projectid} ORDER BY issueid`)
    let activityTitle = req.body.subject + ' (New)';
    let activityDescription = 'Issue created successfully';
    const insertActivity = await db.query(`INSERT INTO activity (time, title, description, author, issueid) VALUES($1,$2,$3,$4,$5)`,
        [createddate.rows[0].now, activityTitle, activityDescription, req.session.user.userid, issueid.rows[issueid.rows.length - 1].issueid], (err, res) => {
            if (err) return res.send(err)
        })
    res.redirect(`/projects/issues/${req.params.projectid}`);
});

router.get('/issues/:projectid/edit/:issueid', checkLogIn, async function (req, res, next) {
    const issue = await db.query(`SELECT * FROM issues WHERE issueid = ${req.params.issueid} AND projectid = ${req.params.projectid}`)
    console.log(issue.rows)
    if (!issue.rows[0]) {
        console.log('hai')
        res.render('projects/issues/notFound', { projectid: req.params.projectid })
    } else {
        const members = await db.query(`SELECT users.userid, users.firstname FROM members
        LEFT JOIN users ON members.userid = users.userid WHERE members.projectid = ${req.params.projectid}`)
        const parentTask = await db.query(`SELECT issueid, subject FROM issues WHERE projectid=${req.params.projectid} AND NOT issueid=${req.params.issueid}`)

        issue.rows[0].startdate = dateConvert(issue.rows[0].startdate)
        issue.rows[0].duedate = dateConvert(issue.rows[0].duedate)
        issue.rows[0].createddate = moment(issue.rows[0].createddate).format('MMMM Do YYYY, h:mm:ss a')
        issue.rows[0].updateddate = moment(issue.rows[0].updateddate).format('MMMM Do YYYY, h:mm:ss a')

        res.render('projects/issues/formEdit', {
            title: 'Edit Issue',
            sidebar: req.url.split('/')[1],
            projectid: req.params.projectid,
            issueid: req.params.issueid,
            issue: issue.rows[0],
            members: members.rows,
            author: req.session.user.firstname,
            parentTask: parentTask.rows,
            files: issue.rows[0].files,
        });
    }
});

router.post('/issues/:projectid/edit/:issueid', checkLogIn, async function (req, res, next) {
    if (req.body.oldfiledeleted) {
        let oldFileDeleted = req.body.oldfiledeleted
        if (Array.isArray(oldFileDeleted)) {
            for (let i = 0; i < oldFileDeleted.length; i++) {
                let deletePath = path.join(__dirname, `../public`) + oldFileDeleted[i].split(",")[2]
                await fs.unlink(deletePath, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
        } else {
            let deletePath = path.join(__dirname, `../public`) + oldFileDeleted.split(",")[2]
            await fs.unlink(deletePath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
    }

    let jsonFiles = [];

    if (req.body.oldfile) {
        let oldFile = req.body.oldfile
        if (Array.isArray(oldFile)) {
            for (let i = 0; i < oldFile.length; i++) {
                let tempFile = oldFile[i].split(",")
                let jsonFile = { name: tempFile[0], type: tempFile[1], location: tempFile[2] };
                jsonFiles.push(jsonFile)
            }
        } else {
            oldFile = oldFile.split(",")
            let jsonFile = { name: oldFile[0], type: oldFile[1], location: oldFile[2] };
            jsonFiles.push(jsonFile)
        }
    }

    if (req.files) {
        for (let i = 0; i < Object.keys(req.files).length; i++) {
            let uploadFile = Object.values(req.files)[i];
            let fileName = Date.now() + uploadFile.name;
            let jsonFile = { name: fileName, type: uploadFile.mimetype, location: `/uploads/${fileName}` };
            jsonFiles.push(jsonFile);
            let uploadPath = path.join(__dirname, `../public/uploads/`) + fileName;
            uploadFile.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).send(err);
            });
        }
    }

    const updateddate = await db.query('SELECT NOW()')
    let closeddate
    if (req.body.status == 'Closed') closeddate = updateddate.rows[0].now;
    if (req.body.estimatedtime == '') req.body.estimatedtime = null;
    if (req.body.spenttime == '') req.body.spenttime = null;

    const updateIssue = await db.query(`UPDATE issues SET tracker = $1, subject = $2, description = $3, status = $4, priority = $5,
        assignee = $6, startdate = $7, duedate = $8, estimatedtime = $9, spenttime = $10, targetversion = $11, updateddate = $12, 
        closeddate = $13, parenttask = $14, done = $15, files = $16 WHERE issueid = ${req.params.issueid}`,
        [req.body.tracker, req.body.subject, req.body.description, req.body.status, req.body.priority, req.body.assignee,
        req.body.startdate, req.body.duedate, req.body.estimatedtime, req.body.spenttime, req.body.targetversion,
        updateddate.rows[0].now, closeddate, req.body.parenttask, req.body.done, jsonFiles], (err, res) => {
            if (err) return res.send(err)
        })

    let activityTitle = req.body.subject + ' (Edit)';
    let activityDescription = 'Issue edited successfully';
    const insertActivity = await db.query(`INSERT INTO activity (time, title, description, author, issueid) VALUES($1,$2,$3,$4, $5)`,
        [updateddate.rows[0].now, activityTitle, activityDescription, req.session.user.userid, req.params.issueid], (err, res) => {
            if (err) return res.send(err)
        })
    res.redirect(`/projects/issues/${req.params.projectid}`);
});

router.get('/issues/:projectid/delete/:issueid', checkLogIn, async function (req, res, next) {
    let files = await db.query(`SELECT files FROM issues WHERE issueid = ${req.params.issueid}`)
    files = files.rows[0].files
    if (files) {
        for (let i = 0; i < files.length; i++) {
            let deletePath = path.join(__dirname, `../public`) + files[i].location
            await fs.unlink(deletePath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
    }

    const subject = await db.query(`SELECT subject FROM issues WHERE issueid = ${req.params.issueid}`);
    const updateddate = await db.query('SELECT NOW()');
    let activityTitle = subject.rows[0].subject + ' (Delete)';
    let activityDescription = 'Issue deleted successfully';
    const insertActivity = await db.query(`INSERT INTO activity (time, title, description, author,issueid) VALUES($1,$2,$3,$4,$5)`,
        [updateddate.rows[0].now, activityTitle, activityDescription, req.session.user.userid, req.params.issueid], (err, res) => {
            if (err) return res.send(err)
        })

    await db.query(`DELETE FROM issues WHERE issueid =${req.params.issueid}`)
    res.redirect(`/projects/issues/${req.params.projectid}`);
});

module.exports = router;

function checkLogIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }

};

function dateConvert(date) {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
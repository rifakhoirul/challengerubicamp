const fs = require('fs')
let data = fs.readFileSync('data.json', 'utf-8')
let tagdata = fs.readFileSync('tagdata.json', 'utf-8')
let todo = data.split("\n")
let taglist = tagdata.split("\n")
let input0 = process.argv;
let i = todo.length - 1;
//default
if (!process.argv[2]) {
    console.log('>>> JS TODO <<<\n$ node todo.js <command>\n$ node todo.js list\n$ node todo.js task <task_id>\n$ node todo.js add <task_content>\n$ node todo.js delete <task_id>\n$ node todo.js complete <task_id>\n$ node todo.js uncomplete <task_id>\n$ node todo.js list:outstanding asc|desc\n$ node todo.js list:completed asc|desc\n$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>\n$ node todo.js filter:<tag_name>')
}
//list
else if (process.argv[2] == 'list') {
    console.log(data)
}
//task
else if (process.argv[2] == 'task') {
    let taskid = process.argv[3]
    if (taskid >= todo.length || taskid <= 0) { console.log('<task_id> tidak ada atau tidak valid') }
    else {
        console.log(todo[taskid])
    }
}
//add
else if (process.argv[2] == 'add') {
    i++;
    let input1 = `${i}. [ ] ${input0.slice(3).join(" ")}`;
    todo.push(input1);
    taglist.push(' ')
    fs.writeFileSync('data.json', `${todo.join("\n")}`);
    fs.writeFileSync('tagdata.json', `${taglist.join("\n")}`);
    console.log(`"${input0.slice(3).join(" ")}" telah ditambahkan`)
}
//delete
else if (process.argv[2] == 'delete') {
    let taskid = process.argv[3]
    if (taskid >= todo.length || taskid <= 0) { console.log('<task_id> tidak ada atau tidak valid') }
    else {
        let pecah = todo[taskid].split(" ");
        if (pecah[2] == 'x') { pecah.splice(0, 2); }
        else { pecah.splice(0, 3); }
        console.log(`'${pecah.join(" ")}' telah dihapus dari daftar`);
        todo.splice(taskid, 1);
        for (let j = 1; j < todo.length; j++) {
            let pecah2 = todo[j].split(" ");
            pecah2[0] = `${j}.`;
            let baru = pecah2.join(" ");
            todo[j] = baru;
        }
        fs.writeFileSync('data.json', `${todo.join("\n")}`);
        taglist.splice(taskid, 1)
        fs.writeFileSync('tagdata.json', `${taglist.join("\n")}`);
    }
}
//complete
else if (process.argv[2] == 'complete') {
    let taskid = process.argv[3]
    if (taskid >= todo.length || taskid <= 0) { console.log('<task_id> tidak ada atau tidak valid') }
    else {
        let pecah = todo[taskid].split(" ");
        if (pecah[1] == '[x]') { console.log(`task ${[taskid]} memang telah selesai.`) }
        else {
            pecah.splice(1, 2, '[x]');
            todo[taskid] = pecah.join(" ");
            fs.writeFileSync('data.json', `${todo.join("\n")}`);
            pecah.splice(0, 2);
            console.log(`"${pecah.join(" ")}" telah selesai.`)
        }
    }
}
//uncomplete
else if (process.argv[2] == 'uncomplete') {
    let taskid = process.argv[3]
    if (taskid >= todo.length || taskid <= 0) { console.log('<task_id> tidak ada atau tidak valid') }
    else {
        let pecah = todo[taskid].split(" ");
        if (pecah[1] == '[x]') {
            pecah.splice(1, 1, '[', ']');
            todo[taskid] = pecah.join(" ");
            fs.writeFileSync('data.json', `${todo.join("\n")}`);
            pecah.splice(0, 3);
            console.log(`"${pecah.join(" ")}" status selesai dibatalkan.`)
        }
        else {
            console.log(`task ${[taskid]} memang belum selesai.`)
        }
    }
}
//list:outstanding
else if (process.argv[2] == 'list:outstanding') {
    let belum = [];
    for (let j = 0; j < todo.length; j++) {
        let cek = todo[j].split(" ")
        if (cek[1] == "[") { belum.push(todo[j]) }
    }

    if (process.argv[3] == 'asc') {
        console.log('Daftar Pekerjaan')
        for (let j = 0; j < belum.length; j++) { console.log(`${belum[j]}`) }
    }
    else if (process.argv[3] == 'desc') {
        let belumreverse = belum.reverse();
        console.log('Daftar Pekerjaan')
        for (let j = 0; j < belum.length; j++) { console.log(`${belumreverse[j]}`) }
    }
    else { console.log("Masukkan command yang valid!") }
}
//list:completed
else if (process.argv[2] == 'list:completed') {
    let udah = [];
    for (let j = 0; j < todo.length; j++) {
        let cek = todo[j].split(" ")
        if (cek[1] == "[x]") { udah.push(todo[j]) }
    }

    if (process.argv[3] == 'asc') {
        console.log('Daftar Pekerjaan')
        for (let j = 0; j < udah.length; j++) { console.log(`${udah[j]}`) }
    }
    else if (process.argv[3] == 'desc') {
        let udahreverse = udah.reverse();
        console.log('Daftar Pekerjaan')
        for (let j = 0; j < udah.length; j++) { console.log(`${udahreverse[j]}`) }
    }
    else { console.log("Masukkan command yang valid!") }
}
//tag
else if (process.argv[2] == 'tag') {
    let taskid = process.argv[3]
    let tagsave = []
    for (let j = 4; j < input0.length; j++) {
        tagsave.push(input0[j])
    }
    taglist[taskid] = tagsave.join(" ")
    fs.writeFileSync('tagdata.json', `${taglist.join("\n")}`);
}
//filter
else if (process.argv[2] != undefined) {
    let cekinput = process.argv[2]
    if (cekinput.split(":")[0] == 'filter') {
        let tagname = cekinput.split(":")[1];
        console.log(tagname)
        let filterlist = [];
        for (let j = 1; j < taglist.length; j++) {
            let pecahtag = taglist[j].split(" ")
            for (let k = 0; k < pecahtag.length; k++) {
                if (pecahtag[k] == tagname) { filterlist.push(j); break }
            }
        }
        console.log(filterlist)
        console.log(`Daftar Pekerjaan`)

        for (let j = 0; j < filterlist.length; j++) {
            console.log(todo[filterlist[j]])
        }
    }
}
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const Data = require('../models/Data');

chai.should();
chai.use(chaiHTTP);

describe('Testing Data', async function () {
    const user = await User.create({email: 'testingdata@mailcom', password:'123', token: 'tokentesting' })
    console.log(user)
    it('ADD', function (done) {
        chai.request(server)
            .post('/api/data/')
            .send({ letter: 'A', frequency: 1.1})
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.status.should.equal(true);
                res.body.data.should.be.a('object');
                // res.body.data.should.have.property('email')
                // res.body.data.should.have.property('token')
                // res.body.data.email.should.equal('rubi.henjaya@gmail.com')
                done()
            })
    })
    // it('#2 endpoint untuk oauth system', function (done) {
    //     chai.request(server)
    //         .post('/api/users/login')
    //         .send({ email: 'rubi.henjaya@gmail.com', password: '1234' })
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.status.should.equal(true);
    //             res.body.data.should.be.a('object');
    //             res.body.data.should.have.property('email')
    //             res.body.data.should.have.property('token')
    //             res.body.data.email.should.equal('rubi.henjaya@gmail.com')
    //             token = res.body.data.token
    //             done();
    //         })
    // })
    // it('#3 endpoint untuk pengecekan token yang dimiliki', function (done) {
    //     chai.request(server)
    //         .post('/api/users/check')
    //         .send({ token: token })
    //         .end(function (err, res) {
    //             console.log(res.body)
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.status.should.equal(true);
    //             res.body.data.should.be.a('object');
    //             res.body.data.should.have.property('valid');
    //             res.body.data.valid.should.equal(true);
    //             done();
    //         })
    // })
    // it('#4 endpoint untuk menghancurkan token ketika melakukan logout', function (done) {
    //     chai.request(server)
    //         .post('/api/users/login')
    //         .send({ email: 'rubi.henjaya@gmail.com', password: '1234' })
    //         .then(function (res) {
    //             return chai.request(server)
    //                 .get('/api/users/destroy')
    //                 .set({ 'Authorization': `Bearer ${res.body.data.token}` })
    //                 .then(function (res) {
    //                     res.should.have.status(200);
    //                     res.should.be.json;
    //                     res.body.should.be.a('object');
    //                     res.body.status.should.equal(true);
    //                     res.body.data.should.be.a('object');
    //                     res.body.data.should.have.property('logout');
    //                     res.body.data.logout.should.equal(true);
    //                     User.deleteOne({ email: 'rubi.henjaya@gmail.com' }).then(() => {
    //                         done()
    //                     })
    //                 }).catch(function (err) {
    //                     User.deleteOne({ email: 'rubi.henjaya@gmail.com' }).then(() => {
    //                         done(err)
    //                     })
    //                 })
    //         })
    // })

    // it('seharusnya menghasilkan apa yaa dengan metode GET', function (done) {
    //     chai.request(server)
    //         .get('/api/users/')
    //         .end(function (err, res) {
    //             console.log(res.body)
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.status.should.equal(true);
    //             res.body.data.should.be.a('array');
    //             res.body.data[res.body.data.length-1].should.have.property('_id')
    //             res.body.data[res.body.data.length-1].should.have.property('email')
    //             res.body.data[res.body.data.length-1].should.have.property('password')
    //             res.body.data[res.body.data.length-1].should.have.property('createdAt')
    //             res.body.data[res.body.data.length-1].should.have.property('updatedAt')
    //             res.body.data[res.body.data.length-1].should.have.property('__v')
    //             res.body.data[res.body.data.length-1].should.have.property('_id')
    //             res.body.data[res.body.data.length-1].email.should.equal('tes@mail.com')
    //             done();
    //         })
    // })
});
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const DataDate = require('../models/DataDate');

chai.should();
chai.use(chaiHTTP);

describe('Testing Data Date', function () {
    let id
    //ADD
    it('ADD', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ email: 'riko@mail.com', password: '123' })
            .then(function (res) {
                return chai.request(server)
                    .post('/api/datadate/')
                    .send({ letter: '2017-12-31', frequency: 1.1 })
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('message')
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('letter')
                        res.body.data.should.have.property('frequency')
                        res.body.data.message.should.equal('Data have been added')
                        res.body.data.letter.should.equal('2017-12-31')
                        res.body.data.frequency.should.equal(1.1)
                        id = res.body.data._id
                        done()
                    })
            }).catch(function (err) {
                done(err)
            })
    })
    //READ
    it('READ', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ email: 'riko@mail.com', password: '123' })
            .then(function (res) {
                return chai.request(server)
                    .get('/api/datadate/')
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('array');
                        res.body.data[res.body.data.length - 1].should.have.property('_id')
                        res.body.data[res.body.data.length - 1].should.have.property('letter')
                        res.body.data[res.body.data.length - 1].should.have.property('frequency')
                        res.body.data[res.body.data.length - 1].letter.should.equal('2017-12-31')
                        res.body.data[res.body.data.length - 1].frequency.should.equal(1.1)
                        done()
                    })
            }).catch(function (err) {
                done(err)
            })
    })
    //BROWSE
    it('BROWSE', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ email: 'riko@mail.com', password: '123' })
            .then(function (res) {
                return chai.request(server)
                    .post('/api/datadate/search')
                    .send({ letter: '2017-12-31', frequency: 1.1 })
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('array');
                        res.body.data[0].should.have.property('_id')
                        res.body.data[0].should.have.property('letter')
                        res.body.data[0].should.have.property('frequency')
                        res.body.data[0].letter.should.equal('2017-12-31')
                        res.body.data[0].frequency.should.equal(1.1)
                        done()
                    })
            }).catch(function (err) {
                done(err)
            })
    })
    //FIND
    it('FIND', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ email: 'riko@mail.com', password: '123' })
            .then(function (res) {
                return chai.request(server)
                    .get(`/api/datadate/${id}`)
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('message')
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('letter')
                        res.body.data.should.have.property('frequency')
                        res.body.data.message.should.equal('Data found')
                        res.body.data.letter.should.equal('2017-12-31')
                        res.body.data.frequency.should.equal(1.1)
                        done()
                    })
            }).catch(function (err) {
                done(err)
            })
    })
    //EDIT
    it('EDIT', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ email: 'riko@mail.com', password: '123' })
            .then(function (res) {
                return chai.request(server)
                    .put(`/api/datadate/${id}`)
                    .send({ letter: '2016-11-30', frequency: 1.2 })
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('message')
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('letter')
                        res.body.data.should.have.property('frequency')
                        res.body.data.message.should.equal('Data have been updated')
                        res.body.data.letter.should.equal('2016-11-30')
                        res.body.data.frequency.should.equal(1.2)
                        done()
                    })
            }).catch(function (err) {
                done(err)
            })
    })
    //DELETE
    it('DELETE', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ email: 'riko@mail.com', password: '123' })
            .then(function (res) {
                return chai.request(server)
                    .delete(`/api/datadate/${id}`)
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('message')
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('letter')
                        res.body.data.should.have.property('frequency')
                        res.body.data.message.should.equal('Data have been deleted')
                        res.body.data.letter.should.equal('2016-11-30')
                        res.body.data.frequency.should.equal(1.2)
                        DataDate.deleteOne({ _id: id }).then(() => {
                            done()
                        })
                    })
            }).catch(function (err) {
                DataDate.deleteOne({ _id: id }).then(() => {
                    done(err)
                })
            })
    })
});
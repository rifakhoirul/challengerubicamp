const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const Maps = require('../models/Maps');

chai.should();
chai.use(chaiHTTP);

describe('Testing Maps', function () {
    let id
    //ADD
    it('ADD', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ email: 'riko@mail.com', password: '123' })
            .then(function (res) {
                return chai.request(server)
                    .post('/api/maps/')
                    .send({ title: 'Cihampelas Walk', lat: -6.8965475, lng: 107.6103536 })
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('message')
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('title')
                        res.body.data.should.have.property('lat')
                        res.body.data.should.have.property('lng')
                        res.body.data.message.should.equal('Data have been added')
                        res.body.data.title.should.equal('Cihampelas Walk')
                        res.body.data.lat.should.equal(-6.8965475)
                        res.body.data.lng.should.equal(107.6103536)
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
                    .get('/api/maps/')
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('array');
                        res.body.data[res.body.data.length - 1].should.have.property('_id')
                        res.body.data[res.body.data.length - 1].should.have.property('title')
                        res.body.data[res.body.data.length - 1].should.have.property('lat')
                        res.body.data[res.body.data.length - 1].should.have.property('lng')
                        res.body.data[res.body.data.length - 1].title.should.equal('Cihampelas Walk')
                        res.body.data[res.body.data.length - 1].lat.should.equal(-6.8965475)
                        res.body.data[res.body.data.length - 1].lng.should.equal(107.6103536)
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
                    .post('/api/maps/search')
                    .send({ title: 'Cihampelas Walk' })
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('array');
                        res.body.data[0].should.have.property('_id')
                        res.body.data[0].should.have.property('title')
                        res.body.data[0].should.have.property('lat')
                        res.body.data[0].should.have.property('lng')
                        res.body.data[0].title.should.equal('Cihampelas Walk')
                        res.body.data[0].lat.should.equal(-6.8965475)
                        res.body.data[0].lng.should.equal(107.6103536)
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
                    .get(`/api/maps/${id}`)
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('message')
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('title')
                        res.body.data.should.have.property('lat')
                        res.body.data.should.have.property('lng')
                        res.body.data.message.should.equal('Data found')
                        res.body.data.title.should.equal('Cihampelas Walk')
                        res.body.data.lat.should.equal(-6.8965475)
                        res.body.data.lng.should.equal(107.6103536)
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
                    .put(`/api/maps/${id}`)
                    .send({ title: 'Trans Studio Mall', lat: -6.9261257, lng: 107.6343728 })
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('message')
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('title')
                        res.body.data.should.have.property('lat')
                        res.body.data.should.have.property('lng')
                        res.body.data.message.should.equal('Data have been updated')
                        res.body.data.title.should.equal('Trans Studio Mall')
                        res.body.data.lat.should.equal(-6.9261257)
                        res.body.data.lng.should.equal(107.6343728)
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
                    .delete(`/api/maps/${id}`)
                    .set({ 'Authorization': `Bearer ${res.body.data.token}` })
                    .then(function (res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.status.should.equal(true);
                        res.body.data.should.be.a('object');
                        res.body.data.should.have.property('message')
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('title')
                        res.body.data.should.have.property('lat')
                        res.body.data.should.have.property('lng')
                        res.body.data.message.should.equal('Data have been deleted')
                        res.body.data.title.should.equal('Trans Studio Mall')
                        res.body.data.lat.should.equal(-6.9261257)
                        res.body.data.lng.should.equal(107.6343728)
                        Maps.deleteOne({ _id: id }).then(() => {
                            done()
                        })
                    })
            }).catch(function (err) {
                Maps.deleteOne({ _id: id }).then(() => {
                    done(err)
                })
            })
    })
});
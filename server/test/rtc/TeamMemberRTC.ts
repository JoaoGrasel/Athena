import {TestManager} from '../TestManager';
const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
let expect = chai.expect;
let io = require("socket.io-client");
let socketUrl = "http://localhost:1337";
let testManager = null;

describe("Teste TeamMemberRTC", () => {
  before(function (done) {
    testManager = new TestManager(done);
  });

  let cliente = null;
  let usuario = null;

  it("Connect", (done) => {
    cliente = io(socketUrl);
    cliente.on("connect", (data) => {
      done();
    });
    cliente.connect();
  });

  describe('Login', ()=>{

    it('1. Login do username errado', (done)=>{
      let email_errado = (msg)=>{
        expect(msg.datas.success).to.be.false;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys('buttons', 'description', 'title');
        cliente.removeListener('retorno', email_errado);
        done();
      };
      cliente.on('retorno', email_errado);
      let user = {
        username: 'team',
        password: 'team_member'
      };
      cliente.emit('logar', {datas: user});
    });

    it('2. Login com senha errada', (done)=>{
      let senha_errado = (msg)=>{
        expect(msg.datas.success).to.be.false;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys('buttons', 'description', 'title');
        cliente.removeListener('retorno', senha_errado);
        done();
      };
      cliente.on('retorno', senha_errado);
      let user = {
        username: 'team_member',
        password: 'teamteam'
      };
      cliente.emit('logar', {datas: user});
    });

    it("3. Team Member Login", (done) => {
      let retorno_login = function (msg) {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys("email","first_name","id","surname","type","username");
        usuario = msg.datas.data;
        cliente.removeListener("retorno", retorno_login);
        done();
      };
      cliente.on("retorno", retorno_login);
      let user = {
        username: "team_member",
        password: "123",
      };
      cliente.emit("logar", {datas: user});
    });

  });

  describe('Horarios e questoes ao logar', () =>{

    it('1. Responder tudo certinho', done =>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data.length).to.be.equal(0);
        cliente.removeListener('retorno', retorno);
        done();
      };
      cliente.on('retorno', retorno);
      let horary = {
        team_member: usuario.id,
        timetable:{
          exit_time: new Date('Thu Jul 03 1980 17:26:53 GMT+0000 (UTC)')
        },
        questions:{
          question1: 'batata1',
          question2: 'batata2',
          question3: 'batata3'
        }
      };
      cliente.emit('update_horary', {datas: horary});
    })
  });

  describe ('Logout', ()=>{

    it("1. Team Member Logout", (done) => {
      let retorno_login = (msg)=>{
        expect(msg.datas.success).to.be.true;
        cliente.removeListener("retorno", retorno_login);
        done();
      };
      cliente.on("retorno", retorno_login);
      let data = {};
      cliente.emit("logout", {datas: data});
    });

  })

});
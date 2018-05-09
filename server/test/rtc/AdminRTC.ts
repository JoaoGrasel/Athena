import {TestManager} from '../TestManager';
const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
let expect = chai.expect;
let io = require("socket.io-client");
let socketUrl = "http://localhost:1337";
let testManager = null;

describe("Teste AdminRTC", () => {
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

    it('Login email errado', (done)=>{
      let email_errado = (msg)=>{
        expect(msg.datas.success).to.be.false;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys('buttons', 'description', 'title');
        cliente.removeListener('retorno', email_errado);
        done();
      };
      cliente.on('retorno', email_errado);
      let user = {
        email: 'admin@administrativo',
        password: 'admin'
      };
      cliente.emit('logar', {datas: user});
    });

    it('Login senha errada', (done)=>{
      let senha_errado = (msg)=>{
        expect(msg.datas.success).to.be.false;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys('buttons', 'description', 'title');
        cliente.removeListener('retorno', senha_errado);
        done();
      };
      cliente.on('retorno', senha_errado);
      let user = {
        email: 'admin@admin',
        password: 'administrativo'
      };
      cliente.emit('logar', {datas: user});
    });

    it("Admin Login", (done) => {
      let retorno_login = function (msg) {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys("email","first_name","id","surname","type");
        usuario = msg.datas.data;
        cliente.removeListener("retorno", retorno_login);
        done();
      };
      cliente.on("retorno", retorno_login);
      let user = {
        email: "admin@admin",
        password: "admin",
      };
      cliente.emit("logar", {datas: user});
    });

  });

  it('Teste', done => {

    const teste = true;

    let retorno = function (msg) {
      expect(msg.datas.success).to.be.true;
      expect(msg.datas.data).to.be.instanceOf(Object);
      cliente.removeListener("retorno", retorno);
      done();
    };
    cliente.on("retorno", retorno);
    cliente.emit("teste", {datas: teste});
  });

  describe ('Logout', ()=>{

    it("Admin Logout", (done) => {
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
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


  let current = {
    cliente: null,
    usuario: null,
    scrum: null,
  }

  it("Connect", (done) => {
    current.cliente = io(socketUrl);
    current.cliente.on("connect", (data) => {
      done();
    });
    current.cliente.connect();
  });

  describe('Login', ()=>{

    it('Login username errado', (done)=>{
      let email_errado = (msg)=>{
        expect(msg.datas.success).to.be.false;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys('buttons', 'description', 'title');
        current.cliente.removeListener('retorno', email_errado);
        done();
      };
      current. cliente.on('retorno', email_errado);
      let user = {
        username: 'adminadministrativo',
        password: 'admin'
      };
      current.cliente.emit('logar', {datas: user});
    });

    it('Login senha errada', (done)=>{
      let senha_errado = (msg)=>{
        expect(msg.datas.success).to.be.false;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys('buttons', 'description', 'title');
        current.cliente.removeListener('retorno', senha_errado);
        done();
      };
      current.cliente.on('retorno', senha_errado);
      let user = {
        username: 'admin',
        password: 'administrativo'
      };
      current.cliente.emit('logar', {datas: user});
    });

    it("Admin Login", (done) => {
      let retorno_login = function (msg) {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys("email","first_name","id","surname","type");
        current.usuario = msg.datas.data;
        current.cliente.removeListener("retorno", retorno_login);
        done();
      };
      current.cliente.on("retorno", retorno_login);
      let user = {
        username: "admin",
        password: "admin",
      };
      current.cliente.emit("logar", {datas: user});
    });

  });

  describe('Teste do CRUD de Scrums', () => {

    it(' Cria Scrum certinho', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("id", "project_name", "scrum_beginning_date", "scrum_description",
                                                   "scrum_end_date", "scrum_history_backlog", "scrum_product_backlog",
                                                   "scrum_sprints", "scrum_sprint_duration", "scrum_status",
                                                   "scrum_team_members");
        expect(msg.datas.data[0].scrum_product_backlog).to.be.instanceOf(Array);
        expect(msg.datas.data[0].scrum_sprints).to.be.instanceOf(Array);
        expect(msg.datas.data[0].scrum_team_members).to.be.instanceOf(Array);
        current.cliente.removeListener('retorno', retorno);
        current.scrum = msg.datas.data[0];
        done();
      };
      current.cliente.on('retorno', retorno);
      let scrum = {
        project_name: "Scrum de Teste",
        scrum_description: "Nascida pra morrer",
        scrum_status: "Created",
        scrum_beginning_date: "Thu Jul 02 1980 15:26:53 GMT+0000 (UTC)",
        scrum_end_date: "Thu Jul 03 1981 15:26:53 GMT+0000 (UTC)",
        scrum_team_members: [
          "5af30e015e2cd29a74d29490"
        ],
        scrum_history_backlog: "5af3121b0084efb9b41f949d",
        scrum_sprint_duration: 14,
        scrum_sprints:[
          "5af31272b1d11768177296ac"
        ],
        scrum_product_backlog: [
          "5af314beb754077482a4cf82",
          "5af314c415a12580e22dbc0e"
        ]
      }
      current.cliente.emit('create_scrum', {datas: scrum});

    });

    it('Busca Scrum', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('get_scrum_by_id', {datas: current.scrum.id});
    });

    it('3. Edita Scrum', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      let edited_scrum = {
        project_name: "Scrum de Teste Editado",
        scrum_description: "Mais do mesmo",
        scrum_status: "Edited",
        scrum_beginning_date: "Fri Jul 03 1980 15:26:53 GMT+0000 (UTC)",
        scrum_end_date: "Fri Jul 04 1981 15:26:53 GMT+0000 (UTC)"
      }
      current.cliente.emit('edit_scrum', {datas: edited_scrum});
    });
  //
  //   it('4. Exclui Scrum', (done)=>{
  //     let retorno = (msg)=>{
  //       expect(msg.datas.success).to.be.true;
  //       cliente.removeListener('retorno', retorno);
  //       done();
  //     };
  //     cliente.on('retorno', retorno);
  //     cliente.emit('', {datas: null});
  //   });
  //
  });

  describe ('Logout', ()=>{

    it("Admin Logout", (done) => {
      let retorno_login = (msg)=>{
        expect(msg.datas.success).to.be.true;
        current.cliente.removeListener("retorno", retorno_login);
        done();
      };
      current.cliente.on("retorno", retorno_login);
      let data = {};
      current.cliente.emit("logout", {datas: data});
    });

  })

});
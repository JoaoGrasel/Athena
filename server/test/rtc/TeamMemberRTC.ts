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
  let scrum: any = null;

  it("Connect", (done) => {
    cliente = io(socketUrl);
    cliente.on("connect", (data) => {
      done();
    });
    cliente.connect();
  });

  describe('Login', () => {

    it('1. Login do username errado', (done) => {
      let email_errado = (msg) => {
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

    it('2. Login com senha errada', (done) => {
      let senha_errado = (msg) => {
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
        expect(msg.datas.data).to.include.all.keys("email", "first_name", "id", "surname", "type", "username");
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

  describe('Horarios e questoes ao logar', () => {

    it('1. Responder tudo certinho', done => {
      let retorno = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data.length).to.be.equal(0);
        cliente.removeListener('retorno', retorno);
        done();
      };
      cliente.on('retorno', retorno);
      let horary = {
        team_member: usuario.id,
        timetable: {
          exit_time: new Date('Thu Jul 03 1980 17:26:53 GMT+0000 (UTC)')
        },
        questions: {
          question1: 'batata1',
          question2: 'batata2',
          question3: 'batata3'
        }
      };
      cliente.emit('update_horary', {datas: horary});
    })
  });

  describe('Relatorio de Horarios e Questoes Diarias', () => {

    it('1. Visualizar ultimos horarios', done => {
      let retorno = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.have.all.keys("_id","month","year","id","timetable");
        expect(msg.datas.data.timetable).to.be.instanceOf(Array);
        msg.datas.data.timetable.forEach(time=>{
          expect(time).to.be.instanceOf(Object);
          expect(time).to.have.all.keys("day","entry_time","exit_time");
        });
        cliente.removeListener('retorno', retorno);
        done();
      };
      cliente.on('retorno', retorno);
      cliente.emit('show_horaries', {datas: null});
    });

    it('2. Encontrar horario por mes e ano', done => {
      let retorno = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        msg.datas.data.forEach(time=>{
          expect(time).to.be.instanceOf(Object);
          expect(time).to.have.all.keys("month","year","id", "timetable");
        });
        expect(msg.datas.data[0].timetable).to.be.instanceOf(Array);
        msg.datas.data[0].timetable.forEach(time=>{
          expect(time).to.be.instanceOf(Object);
          expect(time).to.have.all.keys("day","entry_time","exit_time");
        });
        cliente.removeListener('retorno', retorno);
        done();
      };
      let horaryDate = {
        year: 1,
        month: 1
      }
      cliente.on('retorno', retorno);
      cliente.emit('find_horary_by_year_and_month', {datas: horaryDate})

    });


    it('3. Visualizar as questoes diarias de um horario especifico', done => {
      let retorno = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.have.all.keys("_id","questions","id");
        expect(msg.datas.data.questions).to.be.instanceOf(Array);
        msg.datas.data.questions.forEach(question=>{
          expect(question).to.be.instanceOf(Object);
          expect(question).to.have.all.keys("day","question1","question2", "question3");
        });
        cliente.removeListener('retorno', retorno);
        done();
      }
      let horaryID = "5af30d7e57ace13eb3c6b0dd";
      cliente.on('retorno', retorno);
      cliente.emit('show_questions_by_horary_id', {datas: horaryID})
    })
  });

  describe(' Scrums, Sprints e Tarefas ', () => {

    it('1. Visualizar os Srums', done => {
      let retorno = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data.scrums).to.be.instanceOf(Array);
        msg.datas.data.scrums.forEach(scrum=>{
          expect(scrum).to.be.instanceOf(Object);
          expect(scrum).to.have.all.keys("project_name","scrum_status", "scrum_description", "id", "_id");
        });
        cliente.removeListener('retorno', retorno);
        done();
      }
      cliente.on('retorno', retorno);
      cliente.emit('show_scrums', {datas: null});
    });

    it('2. Visualizar as Sprints de um determinado Scrum', done => {
      let retorno = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data.scrums).to.be.instanceOf(Array);
        msg.datas.data.scrums.forEach(scrum=>{
          expect(scrum).to.be.instanceOf(Object);
          expect(scrum).to.have.all.keys("scrum_sprints", "id", "_id");
          expect(scrum.scrum_sprints).to.be.instanceOf(Array);
          scrum.scrum_sprints.forEach(sprint=>{
            expect(sprint).to.be.instanceOf(Object);
            expect(sprint).to.have.all.keys("sprint_name", "sprint_beginning_date", "sprint_end_date", "sprint_tasks",
                                            "sprint_status", "id", "_id");
          });
        });
        cliente.removeListener('retorno', retorno);
        done();
      }
      cliente.on('retorno', retorno);
      cliente.emit('show_sprints_by_scrum', {datas: null});
    });

      it('3. Visualizar as Historias de um determinado Scrum', done => {
        let retorno = (msg) => {
          expect(msg.datas.success).to.be.true;
          expect(msg.datas.data).to.be.instanceOf(Object);
          expect(msg.datas.data.scrum_history_backlog).to.be.instanceOf(Object);
          expect(msg.datas.data.scrum_history_backlog.histories).to.be.instanceOf(Array);
          msg.datas.data.scrum_history_backlog.histories.forEach(history=>{
            expect(history).to.be.instanceOf(Object);
            expect(history).to.have.all.keys("history_theme", "history_want_can", "id", "_id");
          });
          cliente.removeListener('retorno', retorno);
          done();
        }
        let scrum = "5af310303949f6a7eb8285e8";
        cliente.on('retorno', retorno);
        cliente.emit('show_histories_by_scrum', {datas: scrum});
      });


  //     it('3. Visualizar as tarefas de uma determinada Sprint', done => {
  //
  //     })
  });

  describe('Logout', () => {

    it("1. Team Member Logout", (done) => {
      let retorno_login = (msg) => {
        expect(msg.datas.success).to.be.true;
        cliente.removeListener("retorno", retorno_login);
        done();
      };
      cliente.on("retorno", retorno_login);
      let data = {};
      cliente.emit("logout", {datas: data});
    });

  });
});

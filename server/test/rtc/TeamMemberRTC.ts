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

    it('Responder perguntas do dia ao logar', done => {
      let retorno = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        cliente.removeListener('retorno', retorno);
        done();
      };
      cliente.on('retorno', retorno);
      let answers = {
        question1: 'vermelho1',
        question2: 'vermelho2',
        question3: 'vermelho3'
      };
      cliente.emit('add_day_answers', {datas: answers});
    });

    it('Tentar responder as perguntas mais de uma vez por dia', done => {
      let retorno = (msg) => {
        expect(msg.datas.success).to.be.false;
        cliente.removeListener('retorno', retorno);
        done();
      };
      cliente.on('retorno', retorno);
      let answers = {
        question1: 'batata1',
        question2: 'batata2',
        question3: 'batata3'
      };
      cliente.emit('add_day_answers', {datas: answers});
    })

    it('Informar um horario de saida', done => {
      let retorno = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        cliente.removeListener('retorno', retorno);
        done();
      };
      cliente.on('retorno', retorno);
      let expected_exit_time = {
        expected_exit_time: new Date('Thu Jul 03 1980 17:26:53 GMT+0000 (UTC)')
      };
      cliente.emit('update_daily_exit_time', {datas: expected_exit_time});
    });
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
          expect(time).to.have.all.keys("day","entry_time","expected_exit_time", "real_exit_time");
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
        expect(msg.datas.data[0].timetable).to.be.instanceOf(Array);
        msg.datas.data[0].timetable.forEach(time=>{
          expect(time).to.be.instanceOf(Object);
          expect(time).to.include.all.keys("day","entry_time","expected_exit_time", "real_exit_time");
        });
        cliente.removeListener('retorno', retorno);
        done();
      };
      let horaryDate = {
        year: 2018,
        month: 5
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

    it('1. Visualizar os Scrums', done => {
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
        expect(msg.datas.data.scrum_sprints).to.be.instanceOf(Array);
        msg.datas.data.scrum_sprints.forEach(sprint=>{
            expect(sprint).to.be.instanceOf(Object);
            expect(sprint).to.have.all.keys("sprint_name", "sprint_beginning_date", "sprint_end_date", "sprint_tasks",
                                            "sprint_status", "id", "_id");
        });
        cliente.removeListener('retorno', retorno);
        done();
      }
      let scrum = "5af310303949f6a7eb8285e8";
      cliente.on('retorno', retorno);
      cliente.emit('show_sprints_by_scrum', {datas: scrum});
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


      it('4. Visualizar as tarefas de uma determinada Sprint', done => {
        let retorno = (msg) => {
          expect(msg.datas.success).to.be.true;
          expect(msg.datas.data).to.be.instanceOf(Object);
          expect(msg.datas.data.sprint_tasks).to.be.instanceOf(Array);
          msg.datas.data.sprint_tasks.forEach(task=>{
            expect(task).to.be.instanceOf(Object);
            expect(task).to.have.all.keys("task_name", "task_responsibles", "task_status", "id", "_id");
            expect(task.task_status).to.be.instanceOf(Object);
            expect(task.task_status).to.have.all.keys( "id", "_id", "status_name");
            expect(task.task_responsibles).to.be.instanceOf(Array);
            task.task_responsibles.forEach(responsible=>{
              expect(responsible).to.be.instanceOf(Object);
              expect(responsible).to.have.all.keys("first_name", "type", "id", "_id");
            });
          });
          cliente.removeListener('retorno', retorno);
          done();
        };
        let sprint = "5af31272b1d11768177296ac";
        cliente.on('retorno', retorno);
        cliente.emit('show_tasks_by_sprint', {datas: sprint});
      });
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

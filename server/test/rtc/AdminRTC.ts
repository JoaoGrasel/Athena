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
    sprint: null,
    history: null,
    status: null,
    task: null,
    team_member: null,
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
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.have.all.keys("_id", "updatedAt", "createdAt", "project_name", "scrum_description",
                                                 "scrum_status", "scrum_beginning_date", "scrum_end_date",
                                                 "scrum_history_backlog", "scrum_sprint_duration", "id", "removed",
                                                 "scrum_product_backlog", "scrum_sprints", "scrum_team_members", "__v");
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('get_scrum_by_id', {datas: current.scrum.id});
    });

    it('Edita Scrum', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("updatedAt", "createdAt", "project_name", "scrum_description",
                                                    "scrum_status", "scrum_beginning_date","scrum_end_date",
                                                    "scrum_history_backlog","scrum_sprint_duration","id","removed",
                                                    "scrum_product_backlog","scrum_sprints","scrum_team_members");
        expect(msg.datas.data[0].scrum_product_backlog).to.be.instanceOf(Array);
        expect(msg.datas.data[0].scrum_sprints).to.be.instanceOf(Array);
        expect(msg.datas.data[0].scrum_team_members).to.be.instanceOf(Array);
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
      };
      current.cliente.emit('edit_scrum', {datas: {edited_scrum: edited_scrum, actual_scrum: current.scrum}});
    });

    it('Edita Team Members do Scrum', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas).to.be.true;
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      let edited_scrum_team_members = {
        removed_team_members: ["5af30e015e2cd29a74d29490"],
        added_team_members: ["5b0c017395fd435568db21ea"]
      };
      current.cliente.emit('edit_scrum_team_members', {datas: {edited_scrum_team_members: edited_scrum_team_members, scrum: current.scrum}});
    });

    it('Exclui Scrum', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("updatedAt", "createdAt", "project_name", "scrum_description",
                                                   "scrum_status", "scrum_beginning_date","scrum_end_date",
                                                   "scrum_history_backlog","scrum_sprint_duration","id","removed",
                                                   "scrum_product_backlog","scrum_sprints","scrum_team_members");
        expect(msg.datas.data[0].scrum_product_backlog).to.be.instanceOf(Array);
        expect(msg.datas.data[0].scrum_sprints).to.be.instanceOf(Array);
        expect(msg.datas.data[0].scrum_team_members).to.be.instanceOf(Array);
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('delete_scrum_by_id', {datas: {id:current.scrum.id, update:{removed: true}}});
    });

  });

  describe('Teste do CRUD de Sprints', () => {

    it('Cria Sprint certinha', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("sprint_name", "sprint_beginning_date","sprint_end_date",
                                                   "sprint_status","id","sprint_tasks", "scrum");
        expect(msg.datas.data[0].sprint_tasks).to.be.instanceOf(Array);
        current.sprint = msg.datas.data[0];
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      let sprint = {
        sprint_name: "sprint teste",
        scrum: "5af310303949f6a7eb8285e8",
        sprint_beginning_date:"Tue Mar 25 1980 03:18:52 GMT-0300 (-03)" ,
        sprint_end_date:"Tue Mar 25 1980 03:18:52 GMT-0300 (-03)",
        sprint_tasks:[
          "5af314beb754077482a4cf82",
          "5af314c415a12580e22dbc0e"
        ],
        sprint_status: "Running"

      }
      current.cliente.on('retorno', retorno);
      current.cliente.emit('create_sprint', {datas: sprint});

    });

    it('Busca Sprint', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.have.all.keys("_id","updatedAt","createdAt","sprint_name","sprint_beginning_date",
                                                "sprint_end_date","sprint_status","id","removed","sprint_tasks","__v", "scrum");
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('get_sprint_by_id', {datas: current.sprint.id});

    });

    it('Edita Sprint', (done)=>{
        let retorno = (msg)=>{
          expect(msg.datas.success).to.be.true;
          expect(msg.datas.data).to.be.instanceOf(Array);
          expect(msg.datas.data[0]).to.be.instanceOf(Object);
          expect(msg.datas.data[0]).to.have.all.keys("updatedAt","createdAt","sprint_name","sprint_beginning_date",
                                                     "sprint_end_date","sprint_status","id","removed","sprint_tasks", "scrum");
          expect(msg.datas.data[0].sprint_tasks).to.be.instanceOf(Array);
          current.cliente.removeListener('retorno', retorno);
          done();
        };
        current.cliente.on('retorno', retorno);
        let edited_sprint = {
          sprint_status: "Closed",
        };
        current.cliente.emit('edit_sprint', {datas: {id: current.sprint.id, update: edited_sprint}});
      });

    it('Exclui Sprint', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("updatedAt","createdAt","sprint_name","sprint_beginning_date",
                                                   "sprint_end_date","sprint_status","id","removed","sprint_tasks", "scrum");
        expect(msg.datas.data[0].sprint_tasks).to.be.instanceOf(Array);
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('delete_sprint_by_id', {datas: {id:current.sprint.id, update:{removed: true}}});
    });
  });

  describe('Teste do CRUD de Historias', () => {

    it('Cria Historia certinha', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("history_theme","history_like_one","history_want_can","history_need_to_do",
                                                   "id","history_tasks", "history_backlog");
        expect(msg.datas.data[0].history_tasks).to.be.instanceOf(Array);
        current.history = msg.datas.data[0];
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      let history = {
        history_theme: "RU",
        history_like_one: "Team Member",
        history_want_can: "Jantar no RU",
        history_need_to_do: "Comprar o passe",
        history_tasks: [
          "5af314beb754077482a4cf82",
          "5af314c415a12580e22dbc0e"
        ],
        history_backlog: "5af3121b0084efb9b41f949d"

      }
      current.cliente.on('retorno', retorno);
      current.cliente.emit('create_history', {datas: history});

    });

    it('Busca Historia', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.have.all.keys("_id","updatedAt","createdAt","history_theme","history_like_one","history_want_can",
                                                "history_need_to_do","id","removed","history_tasks","__v", "history_backlog");
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('get_history_by_id', {datas: current.history.id});

    });

    it('Edita Historia', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("updatedAt","createdAt","history_theme","history_like_one",
                                                   "history_want_can","history_need_to_do","id","removed","history_tasks",
                                                   "history_backlog");
        expect(msg.datas.data[0].history_tasks).to.be.instanceOf(Array)
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      let edited_history = {
        history_need_to_do: "Roubar um passe do amiguinho",
      };
      current.cliente.emit('edit_history', {datas: {id: current.history.id, update: edited_history}});
    });

    it('Exclui Historia', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("updatedAt","createdAt","history_theme","history_like_one",
                                                   "history_want_can","history_need_to_do","id","removed","history_tasks",
                                                   "history_backlog");
        expect(msg.datas.data[0].history_tasks).to.be.instanceOf(Array);
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('delete_history_by_id', {datas: {id:current.history.id, update:{removed: true}}});
    });
  });

  describe('Teste do CRUD de Status', () => {

    it('Cria Status certinho', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("status_name","id","next_status","previous_status");
        expect(msg.datas.data[0].next_status).to.be.instanceOf(Array);
        expect(msg.datas.data[0].previous_status).to.be.instanceOf(Array);
        current.status = msg.datas.data[0];
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      let status = {
        status_name: "Complete",
        previous_status: [
          "5af316b4fb91b1e207e7f405"
        ],
        next_status: [],
        completed: true
      }
      current.cliente.on('retorno', retorno);
      current.cliente.emit('create_status', {datas: status});

    });

    it('Busca Status', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.have.all.keys("_id","updatedAt","createdAt","status_name","id","removed","next_status",
                                                "previous_status","__v");
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('get_status_by_id', {datas: current.status.id});

    });

    it('Edita Status', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("updatedAt","createdAt","status_name","id","removed","next_status",
                                                   "previous_status");
        expect(msg.datas.data[0].next_status).to.be.instanceOf(Array)
        expect(msg.datas.data[0].previous_status).to.be.instanceOf(Array)
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      let edited_status = {
        status_name: "Not Complete",
        previous_status: [],
        next_status:[
          "5af316b4fb91b1e207e7f405"
        ]
      };
      current.cliente.emit('edit_status', {datas: {id: current.status.id, update: edited_status}});
    });

    it('Exclui Status', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys("updatedAt","createdAt","status_name","id","removed","next_status",
                                                   "previous_status");
        expect(msg.datas.data[0].next_status).to.be.instanceOf(Array)
        expect(msg.datas.data[0].previous_status).to.be.instanceOf(Array)
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('delete_status_by_id', {datas: {id:current.status.id, update:{removed: true}}});
    });
  });

  describe('Teste do CRUD de Tarefas', () => {

    it('Cria Tarefa certinha', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys(
          "id",
          "task_name",
          "task_status",
          "task_artefact",
          "task_description",
          "task_responsibles"
        );
        expect(msg.datas.data[0].task_responsibles).to.be.instanceOf(Array);
        current.task = msg.datas.data[0];
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      let task = {
        task_name: "Kill pedro",
        task_status: "5af316b4fb91b1e207e7f405",
        task_artefact: "Corpo estirado no chão",
        task_description: "Peça 10 reais para cada amigo para realizar essa missao de matar o pedro.",
        task_responsibles: [
          "5af30e015e2cd29a74d29490"
        ],
        needed_tasks: [],
        task_beginning_date:"Tue Mar 25 1980 03:18:52 GMT-0300 (-03)",
        task_end_date: "Tue Mar 25 1980 03:18:52 GMT-0300 (-03)",
        completed: false,
      }
      current.cliente.on('retorno', retorno);
      current.cliente.emit('create_task', {datas: task});

    });

    it('Busca Tarefa', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.have.all.keys(
          "id",
          "_id",
          "__v",
          "updatedAt",
          "createdAt",
          "task_name",
          "task_status",
          "task_artefact",
          "task_description",
          "task_responsibles",
        );
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('get_task_by_id', {datas: current.task.id});

    });

    it('Edita Task', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys(
          "id",
          "updatedAt",
          "createdAt",
          "task_name",
          "task_status",
          "task_artefact",
          "task_description",
          "task_responsibles"
        );
        expect(msg.datas.data[0].task_responsibles).to.be.instanceOf(Array);
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      let edited_task = {
        completed: true,
      };
      current.cliente.emit('edit_task', {datas: {id: current.task.id, update: edited_task}});
    });

    it('Adiciona Task em uma sprint', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('add_task_in_sprint', {datas: {task_id:current.task.id, sprint_id:"5af31272b1d11768177296ac"}});
    });

    it('Adiciona Task em uma history', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('add_task_in_history', {datas: {id:current.task.id, history: "5af315f24e85890f295d836b"}});
    });

    it('Exclui Task', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys(
          "id",
          "updatedAt",
          "createdAt",
          "task_name",
          "task_status",
          "task_artefact",
          "task_description",
          "task_responsibles"
        );
        expect(msg.datas.data[0].task_responsibles).to.be.instanceOf(Array);
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('delete_task_by_id', {datas: {id:current.task.id, update:{removed: true}}});
    });


  });

  describe('Teste do CRUD de Team Members', () => {
//todo ver a questao dos horarios
    it('Cria Team Member certinho', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys(
          "id",
          "type",
          "email",
          "horary",
          "scrums",
          "surname",
          "username",
          "birthdate",
          "first_name",
        );
        expect(msg.datas.data[0].scrums).to.be.instanceOf(Array);
        current.team_member = msg.datas.data[0];
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      let team_member = {
        first_name: "Thiago",
        surname: "Topster",
        birthdate: "Thu Jul 03 1970 15:26:53 GMT+0000 (UTC)",
        username: "Thaigo",
        email: "tt@thaigo",
        password: "123",
        horary: "5af30d7e57ace13eb3c6b0dd",
        scrums: ["5b1698801a49f5071e55fe21"]
      }
      current.cliente.on('retorno', retorno);
      current.cliente.emit('create_team_member', {datas: team_member});
    });


    it('Busca Team Member', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.have.all.keys(
          "id",
          "_id",
          "__v",
          "type",
          "email",
          "horary",
          "scrums",
          "surname",
          "removed",
          "username",
          "password",
          "updatedAt",
          "createdAt",
          "birthdate",
          "first_name",
        );
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('get_team_member_by_id', {datas: current.team_member.id});

    });

    it('Edita Team Member', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys(
          "updatedAt","createdAt","first_name","surname","birthdate","username",
          "email","password","horary","id","type","removed","scrums"
        );
        expect(msg.datas.data[0].scrums).to.be.instanceOf(Array);
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      let edited_team_member = {
        email: "topster@tgt",
      };
      current.cliente.emit('edit_team_member', {datas: {id: current.team_member.id, update: edited_team_member}});
    });
// todo não esta adicionando ou removendo os scrums
    it('Edita Scrums do Team Member', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas).to.be.true;
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      let edited_team_member_scrums = {
        removed_scrums: ["5b1698801a49f5071e55fe21"],
        added_scrums: ["5b169888ec6ac5329634f5af"]
      };
      current.cliente.emit('edit_team_member_scrums', {datas: {edited_team_member_scrums: edited_team_member_scrums, scrum: current.scrum}});
    });

    it('Exclui Team Member', (done)=>{
      let retorno = (msg)=>{
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Array);
        expect(msg.datas.data[0]).to.be.instanceOf(Object);
        expect(msg.datas.data[0]).to.have.all.keys(
          "updatedAt","createdAt","first_name","surname","birthdate","username",
          "email","password","horary","id","type","removed","scrums"
        );
        expect(msg.datas.data[0].scrums).to.be.instanceOf(Array);
        current.cliente.removeListener('retorno', retorno);
        done();
      };
      current.cliente.on('retorno', retorno);
      current.cliente.emit('delete_team_member_by_id', {datas: {id:current.team_member.id, update:{removed: true}}});
    });
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
import CacheValues from './utils/CacheValues';
import Basic from './utils/BasicComponents';
import Toolbar from './componentes/navigation/Sidenav.vue';

class App extends Basic {
  constructor() {
    super('app');
    this.components = {
      Toolbar,
    };
    this.data = {
      user: CacheValues.getData('user'),
      toolbar: false
    };
    this.methods = {};
    this.listeners = {
      'activate_toolbar': this.activate_toolbar.bind(this),
    };
    this.wiring();
  }

  activate_toolbar(){
    this.data.toolbar = true;
  }
}
export default new App().$vue;

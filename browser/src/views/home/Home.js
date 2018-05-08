import Basic from '../../utils/BasicComponents';
import CacheValues from '../../utils/CacheValues';


class Home extends Basic{
  constructor(){
    super('Home');
    this.data = {
      user: CacheValues.getData('user')
    };

    this.methods = {
      'ready': this.ready.bind(this)
    };
    this.components = {};
    this.listeners = {
      'user_ready': this.ready.bind(this)
    };
    this.watch = {};
    this.wiring();
  }

  ready() {
    this.send_to_browser('activate_toolbar', {});
  }
}
export default new Home().$vue;
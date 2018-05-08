import Basic from '../../utils/BasicComponents';
import CacheValues from '../../utils/CacheValues';
class Sidenav extends Basic{
  constructor(){
    super('Sidenav');
    this.methods = {
      'go': this.go.bind(this)
    };
    this.data = {
      user: CacheValues.getData('user'),
      active_route: '/homeRoot'
    };
    this.wiring();
  }
  go(route){
    this.send_to_browser('change_route', route);
    this.data.active_route = route;
  }
}
export default new Sidenav().$vue;
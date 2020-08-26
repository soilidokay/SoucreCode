import {HttpServiceBase} from './HttpServiceBase';
import {Config} from 'assets/Config';
class HomeHttpService extends HttpServiceBase {
  constructor() {
    super();
    this.GetGroupCategories = this.GetGroupCategories.bind(this);
  }
  GetGroupCategories = async (param: any) => {
    return await this.GET(Config.API_GROUP_CATEGORY, param);
  };
}
export default new HomeHttpService();

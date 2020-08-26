import {HttpServiceBase} from './HttpServiceBase';
import {Config} from 'assets/Config';

class CategoryHttpServices extends HttpServiceBase {
  constructor() {
    super();
    this.GetCategories = this.GetCategories.bind(this);
  }
  GetCategories = async (param: any) => {
    return await this.GET(Config.API_CATEGORIES, param);
  };
}
export default new CategoryHttpServices();

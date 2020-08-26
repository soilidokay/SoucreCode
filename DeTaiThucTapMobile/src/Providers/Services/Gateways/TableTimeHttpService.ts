import {Config} from 'assets/Config';
import {HttpServiceBase} from './HttpServiceBase';

class TableTimeHttpService extends HttpServiceBase {
  constructor() {
    super();
    this.GetTableTimes = this.GetTableTimes.bind(this);
  }
  GetTableTimes = async () => {
    return await this.GET(Config.API_TABLE_TIMES, {});
  };
}
export default new TableTimeHttpService();

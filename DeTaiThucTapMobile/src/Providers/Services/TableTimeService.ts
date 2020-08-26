import ServiceBase from '.';
import {TableTime} from 'Providers/Models/type';
import TableTimeHttpService from './Gateways/TableTimeHttpService';
import {Config} from 'assets/Config';

class TableTimeService extends ServiceBase {
  GetTableTimes = async () => {
    return this.GetData({
      Action: TableTimeHttpService.GetTableTimes,
      ParamRequest: {},
    });
  };
  PostTableTime = (data: TableTime) => {
    return TableTimeHttpService.POST(Config.API_POST_TABLE_TIMES, data, {});
  };
  PutTableTime = (Id: string, data: TableTime) => {
    return TableTimeHttpService.PUT(Config.API_PUT_TABLE_TIMES, data, {
      Id,
    });
  };
  DeleteTableTime = (data: TableTime) => {
    return TableTimeHttpService.DELETE(Config.API_DELETE_TABLE_TIMES, data);
  };
}

export default new TableTimeService();

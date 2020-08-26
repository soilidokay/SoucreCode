import ServiceBase from '.';
import {ActionParamGroup} from './Gateways/type';
import HomeHttpService from './Gateways/HomeHttpService';
import {GroupCategory} from 'Providers/Models/type';

class HomeService extends ServiceBase {
  GetGroupCategories = (
    ParamRequest: ActionParamGroup,
  ): Promise<GroupCategory[]> => {
    return this.GetData({
      Action: HomeHttpService.GetGroupCategories,
      ParamRequest,
    });
  };
}

export default new HomeService();

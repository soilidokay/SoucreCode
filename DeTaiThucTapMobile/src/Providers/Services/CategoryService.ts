import ServiceBase from '.';
import {VocabularyCategory} from 'Providers/Models/type';
import CategoryHttpServices from './Gateways/CategoryHttpServices';
import {ActionParamCategories} from './Gateways/type';
import {Config} from 'assets/Config';

class CategoryService extends ServiceBase {
  GetCategories = (
    ParamRequest: ActionParamCategories,
  ): Promise<VocabularyCategory[]> => {
    return this.GetData({
      Action: CategoryHttpServices.GetCategories,
      ParamRequest,
    });
  };
  PostCategory = (data: VocabularyCategory) => {
    return CategoryHttpServices.POST(Config.API_POST_CATEGORY, data, {});
  };
  PutCategory = (Id: string, data: VocabularyCategory) => {
    return CategoryHttpServices.PUT(Config.API_PUT_CATEGORY, data, {Id});
  };
  DeleteCategory = (data: VocabularyCategory) => {
    return CategoryHttpServices.DELETE(Config.API_DELETE_CATEGORY, data);
  };
}

export default new CategoryService();

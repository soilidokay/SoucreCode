import {Config} from 'assets/Config';
import {HttpServiceBase} from './HttpServiceBase';

class VocabularyHttpService extends HttpServiceBase {
  constructor() {
    super();
    this.GetGroupCategories = this.GetGroupCategories.bind(this);
  }
  GetGroupCategories = async (param: any) => {
    return await this.GET(Config.API_VOCABULARIES, param);
  };
  GetGroupCategory = async (param: any) => {
    return await this.GET(Config.API_VOCABULARY, param);
  };
}
export default new VocabularyHttpService();

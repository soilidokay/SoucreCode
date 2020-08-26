import ServiceBase from '.';
import LearningGoalHttpService from './Gateways/LearningGoalHttpService';
import {ILearningDetailParam} from './type';

class LearningGoalDetailService extends ServiceBase {
  GetVocabularies = async (param: ILearningDetailParam) => {
    return this.GetData({
      Action: LearningGoalHttpService.GetLearnGoalDetails,
      ParamRequest: param,
    });
  };
}

export default new LearningGoalDetailService();

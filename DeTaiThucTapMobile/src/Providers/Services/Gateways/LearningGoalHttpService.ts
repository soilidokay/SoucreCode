import {Config} from 'assets/Config';
import {HttpServiceBase} from './HttpServiceBase';

class LearningGoalHttpService extends HttpServiceBase {
  constructor() {
    super();
    this.GetLearnGoals = this.GetLearnGoals.bind(this);
  }
  GetLearnGoals = async () => {
    return await this.GET(Config.API_LEARNING_GOALS, {});
  };
  GetLearnGoalDetails = (param: any) => {
    return this.GET(Config.API_LEARNING_DETAIL_GOALS, param);
  };
}
export default new LearningGoalHttpService();

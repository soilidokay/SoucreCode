import ServiceBase from '.';
import {ILearningGoalService} from './type';
import {LearningGoal} from 'Providers/Models/type';
import {Sleep} from 'Commons';

class LearningGoalService extends ServiceBase implements ILearningGoalService {
  GetLearningGoals = async () => {
    await Sleep(1000);

    const data: LearningGoal[] = [{Name: 'Hello'}, {Name: 'Hello'}];
    return data;
  };
}

export default new LearningGoalService();

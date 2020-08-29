import ServiceBase from '.';
import {LearningGoal} from 'Providers/Models/type';
import LearningGoalHttpService from './Gateways/LearningGoalHttpService';
import {Config} from 'assets/Config';

class LearningGoalService extends ServiceBase {
  GetLearningGoals = async (): Promise<LearningGoal[]> => {
    return LearningGoalHttpService.GetLearnGoals();
  };
  PostLearningGoal = (data: LearningGoal) => {
    return LearningGoalHttpService.POST(
      Config.API_POST_LEARNING_GOAL,
      data,
      {},
    );
  };
  PutLearningGoal = (Id: string, data: LearningGoal) => {
    return LearningGoalHttpService.PUT(Config.API_PUT_LEARNING_GOAL, data, {
      Id,
    });
  };
  DeleteLearningGoal = (data: LearningGoal) => {
    return LearningGoalHttpService.DELETE(
      Config.API_DELETE_LEARNING_GOAL,
      data,
    );
  };
  PostCategoryToLearningGoal = (data: {
    CategoryId: string;
    LearningGoalId: string;
  }) => {
    return LearningGoalHttpService.POST(
      Config.API_POST_CATEGORY_LEARNING,
      data,
      {},
    );
  };
  PostVocabularyToLearningGoal = (data: {
    VocabularyId: string;
    LearningGoalId: string;
  }) => {
    return LearningGoalHttpService.POST(
      Config.API_POST_VOCABULARY_LEARNING,
      data,
      {},
    );
  };
  DeleteVocabulary = (param: {
    LearningGoalId: string;
    VocabularyId: string;
  }) => {
    return LearningGoalHttpService.DELETE(
      Config.API_DELETE_LEARNING_DETAIL_GOALS,
      param,
    );
  };
}

export default new LearningGoalService();

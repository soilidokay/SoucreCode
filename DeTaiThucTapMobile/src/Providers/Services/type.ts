import {ActionServiceType} from '../Services/HocServices/type';
import {
  GroupCategory,
  VocabularyCategory,
  Vocabulary,
  LearningGoal,
} from 'Providers/Models/type';
export interface ServiceBase {}

export interface IHomeService extends ServiceBase {
  GetGroupCategories: ActionServiceType<GroupCategory>;
}

export interface IVocabularyCategoriesParamRequest {}
export interface IGroupDetail extends ServiceBase {
  GetVocabularyCategories: ActionServiceType<
    VocabularyCategory,
    [IVocabularyCategoriesParamRequest]
  >;
}

export interface IVocabularyParamRequest {}
export interface ICategoryDetail extends ServiceBase {
  GetVocabularies: ActionServiceType<Vocabulary, [IVocabularyParamRequest]>;
}

export interface ILGVocabularyParamRequest {}
export interface ILearningGoalDetail extends ServiceBase {
  GetVocabularies: ActionServiceType<Vocabulary, [ILGVocabularyParamRequest]>;
}

export interface ILearningGoalParamRequest {}
export interface ILearningGoalService extends ServiceBase {
  GetLearningGoals: ActionServiceType<
    LearningGoal,
    [ILearningGoalParamRequest]
  >;
}

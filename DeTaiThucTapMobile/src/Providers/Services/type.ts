import {ActionServiceType} from '../Services/HocServices/type';
import {GroupCategory, VocabularyCategory} from 'Providers/Models/type';
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

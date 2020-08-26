import ServiceBase from '.';
import {ActionParamVocabularies, ActionParamVocabulary} from './Gateways/type';
import VocabularyHttpService from './Gateways/VocabularyHttpService';
import {Vocabulary, Phrase, Pronunciation} from 'Providers/Models/type';
import {Config} from 'assets/Config';

class VocabularyService extends ServiceBase {
  GetVocabularies = (
    ParamRequest: ActionParamVocabularies,
  ): Promise<Vocabulary[]> => {
    return this.GetData({
      Action: VocabularyHttpService.GetGroupCategories,
      ParamRequest,
    });
  };
  GetVocabulary = (
    ParamRequest: ActionParamVocabulary,
  ): Promise<Vocabulary[]> => {
    return this.GetData({
      Action: VocabularyHttpService.GetGroupCategory,
      ParamRequest,
    });
  };
  PostVocabulary = (data: Vocabulary) => {
    return VocabularyHttpService.POST(Config.API_POST_VOCABULARY, data, {});
  };
  PutVocabulary = (Id: string, data: Vocabulary) => {
    return VocabularyHttpService.PUT(Config.API_PUT_VOCABULARY, data, {Id});
  };
  DeleteVocabulary = (data: Vocabulary) => {
    return VocabularyHttpService.DELETE(Config.API_DELETE_VOCABULARY, data);
  };
  PostPhrase = (data: Phrase) => {
    return VocabularyHttpService.POST(Config.API_POST_PHRASE, data, {});
  };
  PutPhrase = (Id: string, data: Phrase) => {
    return VocabularyHttpService.PUT(Config.API_PUT_PHRASE, data, {Id});
  };
  DeletePhrase = (data: Phrase) => {
    return VocabularyHttpService.DELETE(Config.API_DELETE_PHRASE, data);
  };
  PostPronunciation = (data: Pronunciation) => {
    return VocabularyHttpService.POST(Config.API_POST_PRONUNCIATION, data, {});
  };
  PutPronunciation = (Id: string, data: Pronunciation) => {
    return VocabularyHttpService.PUT(Config.API_PUT_PRONUNCIATION, data, {Id});
  };
  DeletePronunciation = (data: Pronunciation) => {
    return VocabularyHttpService.DELETE(Config.API_DELETE_PRONUNCIATION, data);
  };
}

export default new VocabularyService();

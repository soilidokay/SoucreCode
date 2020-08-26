import {ImageURISource} from 'react-native';
export interface Phrase {
  Id: string;
  Sentence: string;
  SentenceVN: string;
  Content: string;
  ContentVN: string;
  VocabularyId: string;
}
export interface Pronunciation {
  Id: string;
  Transcription: string;
  LinkFile: string;
  Audio: string;
  Type: string;
  VocabularyId: string;
}
export interface Vocabulary {
  Id: string;
  Word: string;
  WordVN: string;
  Image: string;
  ImageUrl: string;
  VocabularyCategoryId?: string;
  Phrases?: Phrase[];
  IsShare?: boolean;
  IsPublish?: boolean;
  Pronunciations?: Pronunciation[];
}

export interface VocabularyCategory {
  Id: string;
  UserId?: string;
  Name: string;
  Image: string | ImageURISource;
  ImageUrl: string;
  NameVN: string;
  IsShare?: boolean;
  IsPublish?: boolean;
  Vocabularies?: Vocabulary[];
}

export interface GroupCategory {
  Id: string;
  Name: string;
  IsOwner: boolean;
  VocabularyCategories: VocabularyCategory[];
}

export interface LearningGoal {
  Id: string;
  Name: string;
}

export interface TableTime {
  Id: string;
  IdLearningGoal?: string;
  Name: string;
  Description: string;
  TableTime: number;
  LongTime: number;
  IsLoop: boolean;
}

export interface Vocabulary {
  Id: string;
  Word: string;
  WordVN: string;
  Image: string;
  VocabularyCategoryId?: string;
  Phrase: string;
  IsShare?: boolean;
  IsPublish?: boolean;
}

export interface VocabularyCategory {
  Id: string;
  UserId?: string;
  Name: string;
  Image: string;
  NameVN: string;
  IsShare?: boolean;
  IsPublish?: boolean;
  Vocabularies?: Vocabulary[];
}

export interface GroupCategory {
  Name: string;
  IsOwner: boolean;
  VocabularyCategories: VocabularyCategory[];
}

export interface LearningGoal {
  Name: string;
}

import * as Model from 'Providers/Models/type';

export interface IParamNavigates {
  Title?: string;
  SubTitle?: string;
}

export interface IParamHomeScreens extends IParamNavigates {}
export interface IParamLearningGoalScreen extends IParamNavigates {}
export interface IParamRootApp extends IParamNavigates {}
export interface IParamExtendFeature extends IParamNavigates {}

export interface IParamAboutScreen extends IParamNavigates {}
export interface IParamTimeTableScreen extends IParamNavigates {}
export interface IParamGroupDetailScreen extends IParamNavigates {
  GroupCategory?: Model.GroupCategory;
}
export interface IParamCategoryDetailScreen extends IParamNavigates {
  WordCategory?: Model.VocabularyCategory;
  IsOwner?: boolean;
}
export interface IParamLearningGoalDetailScreen extends IParamNavigates {
  LearningGoal?: Model.LearningGoal;
}
export declare type ParamListNavigateBase = {
  Default: IParamNavigates;
};

export declare type ParamListTabNavigate = {
  Home: IParamHomeScreens;
  LearningGoal: IParamLearningGoalScreen;
  About: IParamAboutScreen;
  TimeTable: IParamTimeTableScreen;
} & ParamListNavigateBase;

export declare type ParamStackNavigateList = {
  RootApp: IParamRootApp;
  ExtendFeature: IParamExtendFeature;
  GroupDetail: IParamGroupDetailScreen;
  CategoryDetail: IParamCategoryDetailScreen;
  LearningGoalDetail: IParamLearningGoalDetailScreen;
} & ParamListNavigateBase;

export declare type ParamNavigate = ParamListNavigateBase &
  ParamListTabNavigate &
  ParamStackNavigateList;

export enum KeyNavigate {
  Home = 'Home',
  Default = 'Default',
  RootApp = 'RootApp',
  LearningGoal = 'LearningGoal',
  About = 'About',
  TimeTable = 'TimeTable',
  ExtendFeature = 'ExtendFeature',
  CategoryDetail = 'CategoryDetail',
  GroupDetail = 'GroupDetail',
  LearningGoalDetail = 'LearningGoalDetail',
}

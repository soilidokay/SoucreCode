import {Dimensions} from 'react-native';

export const {width: widthScreen, height: heightScreen} = Dimensions.get(
  'window',
);
const HalfWidthScreen = Math.floor(widthScreen / 2);
const HalfHeightScreen = Math.floor(heightScreen / 2);
export const LeftRotateValue = -3 * HalfWidthScreen;
export const RightRotateValue = 3 * HalfWidthScreen;
export const UpRotateValue = -2 * HalfHeightScreen;
export const DownRotateValue = 2 * HalfHeightScreen;

export const MaxStackValueAnimated = 2 * Math.pow(HalfWidthScreen, 2);

export enum StateVectorEnum {
  Left = 0,
  Right = 1,
  Up = 2,
  Down = 3,
  None = -1,
}

export const DataTest = [];

export const DataAddition = [];

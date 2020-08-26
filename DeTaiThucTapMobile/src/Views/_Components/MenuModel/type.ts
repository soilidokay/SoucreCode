import {ModalProps} from 'react-native';

export type TVisitable = boolean;
export type TMenuModelStateBase = {
  onSubmit: (data: any) => void;
  data?: any[];
  renderItem?: (data: {item: any; index: number}) => JSX.Element;
  keyExtractor?: (item: any, index: number) => any;
};

export interface IMenuModelState extends TMenuModelStateBase {
  visitable: TVisitable;
}
export interface IMenuModelProps extends ModalProps {
  data?: any[];
  renderItem?: (data: {item: any; index: number}) => JSX.Element;
  keyExtractor?: (item: any, index: number) => any;
}

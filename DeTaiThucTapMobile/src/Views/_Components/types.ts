import {ModalProps} from 'react-native';
import {ModelBase, TConfigModel} from './FormContent/type';
export interface IModalFormProps<Model> extends ModalProps {
  config: TConfigModel<Model>;
}
export interface IModalFormState<Model> {
  visitable: boolean;
  data?: Extract<Model, ModelBase>;
  onSubmit: (data: any) => void;
}

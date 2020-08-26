import Controls from './Controls';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ImageURISource,
} from 'react-native';

export type MapControl = keyof Record<
  Extract<keyof typeof Controls, string>,
  Extract<typeof Controls, {}>
>;
export type MapOption = {
  Default: IOptionInput;
  CheckBox: IOptionCheckBox;
  Image: IOptionImage;
  Pronunciation: IOptionPronunciation;
  TimePicker: IOptionCheckBox;
  TableTimeOfWeek: IOptionTableTimeOfWeek;
  ComboBox: IOptionComboBox;
};

export type OptionBase = {
  DisplayName?: string;
  Name?: string;
};

export type OptionType<KeyControl extends Extract<MapControl, string>> = {
  Type: KeyControl;
  option: MapOption[KeyControl];
};

export declare type ModelBase = {[key: string]: any};
export declare type TConfigModel<Model> = {
  [Key in keyof Extract<Model, ModelBase>]?: OptionType<MapControl>;
};

export interface IFormContentProps<Model> {
  config: TConfigModel<Model>;
  data?: Extract<Model, ModelBase>;
  onSubmit: (data: Model) => void;
}

export interface ControlBase extends OptionBase {
  minHeight?: number;
  Value?: any;
  ActionEvent: {
    onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onChangValue: (data?: string | boolean | number | ImageURISource) => void;
  };
}
export interface IOptionInput extends OptionBase {
  Placeholder?: string;
}
export interface IOptionTimePicker extends OptionBase {}
export interface IFile {
  uri: string;
  name?: string;
  type?: string;
}

export interface IInputControl extends IOptionInput, ControlBase {}
export type TDataItem = {label: string; value: any};
export interface IOptionComboBox extends OptionBase {
  Placeholder?: string;
  DataItem?: () => TDataItem[] | Promise<TDataItem[]>;
}
export interface IComboBoxControl extends IOptionComboBox, ControlBase {}
export interface ITimePicker extends IOptionInput, ControlBase {}
export interface IOptionCheckBox extends OptionBase {}
export interface ICheckBoxControl extends IOptionCheckBox, ControlBase {}
export interface IOptionImage extends OptionBase {}
export interface IImageControl extends IOptionImage, ControlBase {}
export interface IImageControlState {
  source?: IFile;
  sourceDefault: IFile;
}
export interface IOptionTableTimeOfWeek extends OptionBase {}
export interface ITableTimeOfWeek extends IOptionTableTimeOfWeek, ControlBase {}

export interface IOptionPronunciation extends OptionBase {}

export interface IPronunciationControl
  extends IOptionPronunciation,
    ControlBase {}
export interface IPronunciationControlState {
  source?: IFile;
  sourceDefault: IFile | string | undefined;
}

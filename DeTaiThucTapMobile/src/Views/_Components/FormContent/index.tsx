import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IFormContentProps,
  TConfigModel,
  MapControl,
  OptionType,
  ModelBase,
} from './type';
import Controls from './Controls';
import Colors from 'assets/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ContainerBox from 'Layouts/ContainerBox';
export class FormContent<Model> extends PureComponent<
  IFormContentProps<Model>
> {
  private GenerateData = {} as ModelBase;
  constructor(props: IFormContentProps<Model>) {
    super(props);
  }

  generateControl = () => {
    const {data, config} = this.props;
    const keys = Object.keys(config ?? {});
    return keys.map((key: string, index: number) => {
      if (!config) {
        return [];
      }
      const conf = config[key];
      const Control = Controls[conf?.Type ?? 'Default'];
      const Value = data ? data[key] : undefined;
      return (
        <Control
          key={'key' + index}
          {...{Value}}
          {...conf?.option}
          Name={key}
          minHeight={50}
          ActionEvent={{
            onChangValue: (dataValue) => {
              this.GenerateData[key] = dataValue;
            },
          }}
        />
      );
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={styles.container}
        scrollEnabled={true}>
        {this.generateControl()}
        <ContainerBox style={styles.WrapAction}>
          <TouchableOpacity
            style={styles.TouchDone}
            onPress={() => {
              const temp = Object.assign(
                {},
                this.props.data,
                this.GenerateData,
              ) as ModelBase;
              const Keys = Object.keys(temp);
              Keys.forEach((key) => {
                if (!temp[key]) {
                  delete temp[key];
                }
              });
              this.props.onSubmit(temp as Model);
            }}>
            <Text style={styles.textDone}>Done</Text>
          </TouchableOpacity>
        </ContainerBox>
      </KeyboardAwareScrollView>
    );
  }
}

export function createConfig<KeyControl extends MapControl>(
  config: OptionType<KeyControl>,
) {
  return config;
}

export default function createFormContent<Model>(config: TConfigModel<Model>) {
  class FromModel extends FormContent<Model> {
    static defaultProps: IFormContentProps<Model> = {
      config,
      onSubmit: () => {},
    };
  }

  return FromModel;
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 2,
    backgroundColor: Colors.CustomWhite,
    margin: 3,
  },
  wrapContent: {},
  WrapAction: {
    height: 50,
    alignItems: 'flex-end',
    backgroundColor: Colors.CustomLightBlue,
    borderRadius: 5,
    margin: 5,
    padding: 2,
  },
  TouchDone: {
    flex: 1,
    width: 100,
    alignItems: 'center',
    backgroundColor: Colors.White,
    justifyContent: 'center',
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.CustomLightGreen,
  },
  textDone: {
    color: Colors.Green,
    fontWeight: 'bold',
  },
});

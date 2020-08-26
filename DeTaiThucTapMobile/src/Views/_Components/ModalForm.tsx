import React, {PureComponent} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {IModalFormProps, IModalFormState} from './types';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {FormContent} from './FormContent';
import {ModelBase, TConfigModel} from './FormContent/type';
export class ModalForm<Model> extends PureComponent<
  IModalFormProps<Model>,
  IModalFormState<Model>
> {
  constructor(props: IModalFormProps<Model>) {
    super(props);
    this.state = {
      visitable: false,
      onSubmit: () => {},
    };
  }
  close = () => {
    this.setState({visitable: false});
  };
  Show = ({
    data,
    onSubmit,
  }: {
    data?: Extract<Model, ModelBase>;
    onSubmit: (data: Model) => Promise<void> | void;
  }) => {
    this.setState({visitable: true, data, onSubmit});
  };
  render() {
    return (
      <Modal transparent={true} {...this.props} visible={this.state.visitable}>
        <View style={styles.container}>
          <FormContent
            data={this.state.data}
            config={this.props.config}
            onSubmit={this.state.onSubmit}
          />
          <View style={styles.WrapClose}>
            <ButtonIcon
              style={styles.btn}
              onPress={this.close}
              IconComponent={Fontisto}
              icon={'close'}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default function createModelFormContent<Model>(
  config: TConfigModel<Model>,
) {
  class ModalFromModel extends ModalForm<Model> {
    static defaultProps: IModalFormProps<Model> = {
      config,
    };
  }

  return ModalFromModel;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#757575b3',
  },
  WrapClose: {
    minHeight: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
  },
});

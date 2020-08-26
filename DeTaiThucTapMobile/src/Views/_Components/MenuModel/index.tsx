import React, {PureComponent} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {IMenuModelProps, IMenuModelState, TMenuModelStateBase} from './type';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ContainerBox from 'Layouts/ContainerBox';
import Colors from 'assets/Colors';

export class MenuModel extends PureComponent<IMenuModelProps, IMenuModelState> {
  constructor(props: IMenuModelProps) {
    super(props);
    this.state = {
      visitable: false,
      onSubmit: () => {},
    };
  }
  static defaultProps: IMenuModelProps = {
    keyExtractor: (item, index) => 'key' + index,
    renderItem: (data) => {
      return <Text style={styles.text}>{data.item}</Text>;
    },
  };
  close = () => {
    this.setState({visitable: false});
  };
  Show = (state: TMenuModelStateBase) => {
    this.setState(Object.assign({}, state, {visitable: true}));
  };
  renderWrapItem = (data: {item: any; index: number}) => {
    const renderItem = this.state.renderItem
      ? this.state.renderItem
      : this.props.renderItem;
    return (
      <View style={styles.WrapContainer}>
        <ContainerBox style={styles.containerBox}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              this.state.onSubmit(data.item);
              this.close();
            }}>
            {renderItem && renderItem(data)}
          </TouchableOpacity>
        </ContainerBox>
      </View>
    );
  };
  render() {
    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        {...this.props}
        visible={this.state.visitable}>
        <View style={styles.container}>
          <View style={styles.Border}>
            <View style={styles.WrapContent}>
              <FlatList
                data={this.state.data}
                renderItem={this.renderWrapItem}
                keyExtractor={this.props.keyExtractor}
              />
            </View>
            <View style={styles.WrapClose}>
              <ButtonIcon
                style={styles.btn}
                onPress={this.close}
                IconComponent={Fontisto}
                icon={'close'}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  WrapClose: {
    minHeight: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
  },
  touch: {
    justifyContent: 'center',
  },
  text: {textAlign: 'center'},
  containerBox: {
    height: 30,
    justifyContent: 'center',
    backgroundColor: Colors.CustomWhite,
    borderRadius: 5,
  },
  Border: {
    backgroundColor: '#757575b3',
    padding: 10,
  },
  WrapContainer: {padding: 2},
  WrapContent: {
    backgroundColor: Colors.CustomLightBlue,
    maxHeight: 450,
    borderRadius: 5,
    padding: 10,
  },
});

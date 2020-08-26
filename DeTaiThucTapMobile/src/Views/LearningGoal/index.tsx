import React, {PureComponent, createRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {
  PropsLearningGoal,
  FlatListLearningGold as FlatListLearningGoal,
  FlatListLearningGoldProp as FlatListLearningGoalProp,
} from 'Views/type';
import LearningGoalService from 'Providers/Services/LearningGoalService';
import HocServices from 'Providers/Services/HocServices';
import {ILearningGoalParamRequest} from 'Providers/Services/type';
import LayoutItemLearningGoal from 'Views/_Layouts/LayoutItemLearningGoal';
import TitleGroup from 'Views/_Components/TitleGroup';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from 'assets/Colors';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {KeyNavigate} from 'Providers/Navigates/Params';
import * as Model from '../../Providers/Models/type';
import AppContext from 'Providers/Contexts/AppContext';
import createModelFormContent, {ModalForm} from 'Views/_Components/ModalForm';

const FormLearning = createModelFormContent<Model.LearningGoal>({
  Name: {Type: 'Default', option: {}},
});
class LearningGoal extends PureComponent<PropsLearningGoal> {
  private refModal = createRef<ModalForm<Model.LearningGoal>>();
  private ConfigFlatList: FlatListLearningGoalProp;
  constructor(props: PropsLearningGoal) {
    super(props);
    const {data} = props;
    this.ConfigFlatList = {
      data,
      renderItem: ({item, index}) => {
        return (
          <LayoutItemLearningGoal
            Icon={
              <View style={styles.IconRow}>
                <FontAwesome5Icon
                  color={Colors.CustomGreen}
                  name={'graduation-cap'}
                  size={30}
                />
              </View>
            }
            Text={
              <TouchableOpacity
                style={styles.TouchText}
                onPress={() => this.onPressItem(item)}>
                <Text style={styles.Text}>{index + 1 + '. ' + item.Name} </Text>
              </TouchableOpacity>
            }
            Action={[
              <ButtonIcon
                onPress={() => this.onPressEdit(item)}
                key={'00'}
                sizeIcon={30}
                IconComponent={MaterialIcons}
                icon={'edit'}
              />,
              <ButtonIcon
                key={'01'}
                onPress={() => this.onPressDelete(item)}
                sizeIcon={30}
                IconComponent={MaterialIcons}
                colorIcon={Colors.Orange}
                icon={'delete'}
              />,
            ]}
          />
        );
      },
      keyExtractor: (item, index) => 'key' + index,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: {paddingBottom: AppContext.HeightTabNavigate},
    };
  }
  onPressEdit = (data: Model.LearningGoal) => {
    this.refModal.current?.Show({
      data: data,
      onSubmit: this.onSubmitEdit,
    });
  };
  onSubmitEdit = async (data: Model.LearningGoal) => {
    await LearningGoalService.PutLearningGoal(data.Id, data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('Putting is Failed!');
      });
    this.refModal.current?.close();
  };
  onPressAdd = () => {
    this.refModal.current?.Show({onSubmit: this.onSubmitAdd});
  };
  onSubmitAdd = async (data: Model.LearningGoal) => {
    await LearningGoalService.PostLearningGoal(data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('addition is Failed!');
      });
    this.refModal.current?.close();
  };
  onPressDelete = (data: Model.LearningGoal) => {
    Alert.alert('Delete', `Are you sure delete "${data.Name ?? ''}"?`, [
      {
        text: 'OK',
        style: 'destructive',
        onPress: async () => {
          await LearningGoalService.DeleteLearningGoal(data)
            .then(this.props.refresh)
            .catch(() => {
              Alert.alert('Deletion is Failed!');
            });
        },
      },
      {
        text: 'cancel',
        style: 'cancel',
      },
    ]);
  };
  onPressItem = (item?: Model.LearningGoal) => {
    const {navigation} = this.props;
    navigation?.navigate(KeyNavigate.LearningGoalDetail, {
      LearningGoal: item,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TitleGroup ActionName="Add" onPress={this.onPressAdd}>
          Learning List
        </TitleGroup>
        <FlatListLearningGoal {...this.ConfigFlatList} />
        <FormLearning
          ref={this.refModal}
          visible={true}
          animationType={'slide'}
        />
      </View>
    );
  }
}
export default HocServices<PropsLearningGoal, ILearningGoalParamRequest>(
  LearningGoal,
  {
    ActionService: [LearningGoalService.GetLearningGoals],
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
  },
  TouchText: {
    flex: 1,
    justifyContent: 'center',
  },
  Text: {
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  IconRow: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});

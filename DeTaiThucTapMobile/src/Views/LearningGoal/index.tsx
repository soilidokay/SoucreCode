import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
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
class LearningGoal extends PureComponent<PropsLearningGoal> {
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
                onPress={this.onPressAdd}
                key={'00'}
                sizeIcon={30}
                IconComponent={MaterialIcons}
                icon={'edit'}
              />,
              <ButtonIcon
                key={'01'}
                onPress={this.onPressDelete}
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
  onPressAdd = () => {};
  onPressDelete = () => {};
  onPressItem = (item?: Model.LearningGoal) => {
    const {navigation} = this.props;
    navigation?.navigate(KeyNavigate.LearningGoalDetail, {
      LearningGoal: item,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TitleGroup ActionName="Add" onPress={() => {}}>
          Learning List
        </TitleGroup>
        <FlatListLearningGoal {...this.ConfigFlatList} />
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

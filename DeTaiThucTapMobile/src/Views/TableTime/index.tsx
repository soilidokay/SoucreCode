import React, {PureComponent, createRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {
  PropsTableTime,
  FlatListTableTime,
  FlatListTableTimeProp,
} from 'Views/type';
import TableTimeService from 'Providers/Services/TableTimeService';
import HocServices from 'Providers/Services/HocServices';
import {ITableTimeParamRequest} from 'Providers/Services/type';
import LayoutItemTableTime from 'Views/_Layouts/LayoutItemTableTime';
import TitleGroup from 'Views/_Components/TitleGroup';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from 'assets/Colors';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Model from '../../Providers/Models/type';
import AppContext from 'Providers/Contexts/AppContext';
import createModelFormContent, {ModalForm} from 'Views/_Components/ModalForm';
import LearningGoalService from 'Providers/Services/LearningGoalService';
import {TDataItem} from 'Views/_Components/FormContent/type';
import ReactNativeAN from 'DeclareLibs/ReactNativeAN';

const FormLearning = createModelFormContent<Model.TableTime>({
  LongTime: {Type: 'TimePicker', option: {}},
  TableTime: {Type: 'TableTimeOfWeek', option: {}},
  IsLoop: {Type: 'CheckBox', option: {DisplayName: 'Loop'}},
  Name: {Type: 'Default', option: {}},
  IdLearningGoal: {
    Type: 'ComboBox',
    option: {
      DataItem: () => {
        return LearningGoalService.GetLearningGoals()
          .then((data) => {
            return data.map(
              (item) => ({label: item.Name, value: item.Id} as TDataItem),
            );
          })
          .catch(() => []);
      },
      Placeholder: 'Select Learning Goal',
    },
  },
  Description: {Type: 'Default', option: {}},
});
class TableTime extends PureComponent<PropsTableTime> {
  private refModal = createRef<ModalForm<Model.TableTime>>();
  private ConfigFlatList: FlatListTableTimeProp;
  constructor(props: PropsTableTime) {
    super(props);
    const {data} = props;
    this.ConfigFlatList = {
      data,
      renderItem: ({item, index}) => {
        return (
          <LayoutItemTableTime
            Icon={
              <View style={styles.IconRow}>
                <FontAwesome5Icon
                  color={Colors.CustomGreen}
                  name={'clock'}
                  size={30}
                />
              </View>
            }
            Text={
              <TouchableOpacity
                style={styles.TouchText}
                onPress={() => this.onPressItem(item)}>
                <Text style={styles.Text}>
                  {index +
                    1 +
                    '. ' +
                    (item.Name ?? '<None>') +
                    ' - ' +
                    new Date(item.LongTime ?? 0).toLocaleTimeString()}
                </Text>
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
  onPressEdit = (data: Model.TableTime) => {
    this.refModal.current?.Show({
      data: data,
      onSubmit: this.onSubmitEdit,
    });
  };
  onSubmitEdit = async (data: Model.TableTime) => {
    await TableTimeService.PutTableTime(data.Id, data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('Putting is Failed!');
      });
    this.refModal.current?.close();
  };
  onPressAdd = async () => {
    // const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 10000)); // set exact date time | Format: dd-MM-yyyy HH:mm:ss

    // const alarmNotifData = {
    //   title: 'My Notification Title1',
    //   message: 'My Notification Message',
    //   channel: 'my_channel_id',
    //   small_icon: 'ic_launcher',
    //   sound_name: 'sao.mp3',

    //   // You can add any additional data that is important for the notification
    //   // It will be added to the PendingIntent along with the rest of the bundle.
    //   // e.g.
    //   data: {foo: 'bar'},
    // };
    // const alarm = await ReactNativeAN.scheduleAlarm({
    //   ...alarmNotifData,
    //   fire_date: fireDate,
    // });
    // console.log(alarm); // { id: 1 }

    //Delete Scheduled Alarm
    //ReactNativeAN.deleteAlarm(alarm.id);

    //Delete Repeating Alarm
    // ReactNativeAN.deleteRepeatingAlarm(alarm.id);

    //Stop Alarm
    //ReactNativeAN.stopAlarmSound();

    //Send Local Notification Now
    // ReactNativeAN.sendNotification(alarmNotifData);

    //Get All Scheduled Alarms
    // const alarms = await ReactNativeAN.getScheduledAlarms();

    //Clear Notification(s) From Notification Center/Tray
    // ReactNativeAN.removeFiredNotification(alarm.id);
    // ReactNativeAN.removeAllFiredNotifications();
    this.refModal.current?.Show({onSubmit: this.onSubmitAdd});
  };
  onSubmitAdd = async (data: Model.TableTime) => {
    await TableTimeService.PostTableTime(data)
      .then(this.props.refresh)
      .catch(() => {
        Alert.alert('addition is Failed!');
      });
    this.refModal.current?.close();
  };
  onPressDelete = (data: Model.TableTime) => {
    Alert.alert('Delete', `Are you sure delete "${data.Name ?? ''}"?`, [
      {
        text: 'OK',
        style: 'destructive',
        onPress: async () => {
          await TableTimeService.DeleteTableTime(data)
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
  onPressItem = (item?: Model.TableTime) => {
    console.log(item);
    // const {navigation} = this.props;
    // navigation?.navigate(KeyNavigate.TableTimeDetail, {
    //   TableTime: item,
    // });
  };
  render() {
    return (
      <View style={styles.container}>
        <TitleGroup ActionName="Add" onPress={this.onPressAdd}>
          TableTime List
        </TitleGroup>
        <FlatListTableTime {...this.ConfigFlatList} />
        <FormLearning
          ref={this.refModal}
          visible={true}
          animationType={'slide'}
        />
      </View>
    );
  }
}
export default HocServices<PropsTableTime, ITableTimeParamRequest>(TableTime, {
  ActionService: [TableTimeService.GetTableTimes],
});

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

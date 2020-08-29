import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {PropsUserManage} from 'Views/type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from 'assets/Colors';
import LayoutCircle from 'Layouts/LayoutCircle';
import UserProfile from 'Providers/Accessors/UserProfile';
import ContainerBox from 'Layouts/ContainerBox';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class UserManage extends PureComponent<PropsUserManage> {
  onPressLogout = () => {
    UserProfile.Logout();
  };
  render() {
    return (
      <View style={styles.container}>
        <ContainerBox style={styles.Info}>
          <LayoutCircle style={styles.WrapIcon}>
            <FontAwesome5Icon size={40} name={'user'} />
          </LayoutCircle>
          <Text style={styles.Email}>{UserProfile.getEmail()}</Text>
        </ContainerBox>
        <ButtonText
          onPress={this.onPressLogout}
          icon={'logout'}
          text={'LogOut'}
        />
      </View>
    );
  }
}
const ButtonText = (props: {
  text: string;
  icon: string;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.ContainerBtn}>
        <ContainerBox style={styles.WarpBTN}>
          <ButtonIcon
            disabled={true}
            icon={props.icon}
            IconComponent={AntDesign}
            style={styles.btn}
          />
          <Text style={styles.textBtn}>{props.text}</Text>
        </ContainerBox>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Info: {
    height: 300,
    backgroundColor: Colors.CustomGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WrapIcon: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Email: {
    color: Colors.LightGreen_A5,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  ContainerBtn: {height: 40, padding: 3, marginTop: 5},
  btn: {flex: 10},
  textBtn: {flex: 90, color: Colors.Green},
  WarpBTN: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.LightGray,
    alignItems: 'center',
  },
});

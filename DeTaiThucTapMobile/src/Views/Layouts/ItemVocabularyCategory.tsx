import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ItemVocabularyCategoryProps} from './types';
import Colors from 'assets/Colors';
import ContainerBox from 'Layouts/ContainerBox';
import LayoutCircle from 'Layouts/LayoutCircle';
import ButtonIcon from 'Providers/Components/ButtonIcon';
import Entypo from 'react-native-vector-icons/Entypo';
const {width: WidthScreen} = Dimensions.get('window');
const WidthImage = WidthScreen / 6;
const ItemVocabularyCategory: FC<ItemVocabularyCategoryProps> = (props) => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <ContainerBox style={styles.containerBox}>
        <TouchableOpacity style={styles.Touch} onPress={props.onPress}>
          <View style={styles.WrapImage}>
            <Image
              style={styles.image}
              resizeMode={'stretch'}
              source={{uri: item?.Image}}
            />
          </View>
          <View style={styles.WrapContent}>
            <Text style={styles.Word}>{item?.Name}</Text>
            <Text style={styles.WordVn}>{item?.NameVN}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.action}>
          <LayoutCircle style={styles.WarpButtonAdd}>
            <ButtonIcon
              onPress={props.onPressAddToList}
              style={styles.ButtonAdd}
              IconComponent={Entypo}
              icon={'add-to-list'}
              colorIcon={Colors.CustomGreen}
            />
          </LayoutCircle>
        </View>
      </ContainerBox>
    </View>
  );
};
export default ItemVocabularyCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  containerBox: {
    flex: 1,
    borderRadius: 5,
    marginRight: 0,
    backgroundColor: Colors.CustomWhite,
  },
  Touch: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
  },
  WrapImage: {
    flex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: WidthImage,
  },
  WrapContent: {
    flex: 80,
    justifyContent: 'center',
    marginLeft: 10,
    paddingHorizontal: 3,
  },
  Word: {fontWeight: 'bold', fontSize: 15},
  WordVn: {fontSize: 15},
  Phrase: {
    borderTopWidth: 1,
    fontSize: 15,
    color: Colors.Gray,
    borderColor: Colors.LightGray,
  },
  image: {
    width: WidthImage,
    height: WidthImage,
  },
  WrapInfo: {
    marginVertical: 10,
    flex: 20,
    borderLeftWidth: 1,
    borderColor: Colors.LightGray,
  },
  WrapIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IConText: {
    fontSize: 10,
    color: Colors.Gray,
  },
  action: {
    height: 30,
    backgroundColor: Colors.White,
    borderRadius: 5,
    alignItems: 'center',
  },
  ButtonAdd: {
    flex: 1,
  },
  WarpButtonAdd: {
    flex: 1,
    margin: 1,
    borderColor: Colors.LightGreen,
    marginRight: 5,
  },
});

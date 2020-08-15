import React, {FC} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ItemVocabularyProps, ViewIconProps} from './types';
import ContainerBox from 'Layouts/ContainerBox';
import Colors from 'assets/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const ItemVocabulary: FC<ItemVocabularyProps> = (props) => {
  const {item} = props;
  return (
    <ContainerBox style={styles.container}>
      <View style={styles.WrapImage}>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={{uri: item.Image}}
        />
      </View>
      <View style={styles.WrapContent}>
        <Text style={styles.Word}>{item.Word}</Text>
        <Text style={styles.WordVn}>{item.WordVN}</Text>
        <Text style={styles.Phrase}>{item.Phrase}</Text>
      </View>
      <View style={styles.WrapInfo}>
        <ViewIcon icon={'heart'} />
      </View>
    </ContainerBox>
  );
};
const ViewIcon: FC<ViewIconProps> = (props) => {
  return (
    <View style={styles.WrapIcon}>
      <FontAwesome5Icon color={Colors.Red} size={10} name={props.icon} />
      <Text style={styles.IConText}>1000</Text>
    </View>
  );
};
export default ItemVocabulary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    margin: 5,
    marginRight: 0,
    borderRadius: 5,
  },
  WrapImage: {
    flex: 30,
    padding: 3,
  },
  WrapContent: {
    flex: 50,
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
    flex: 1,
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
});

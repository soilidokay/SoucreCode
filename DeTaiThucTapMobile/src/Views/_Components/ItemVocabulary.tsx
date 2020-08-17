import React, {FC} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ItemVocabularyProps} from '../_Layouts/types';
import ContainerBox from 'Layouts/ContainerBox';
import Colors from 'assets/Colors';
import ViewIcon from './ViewIcon';

const ItemVocabulary: FC<ItemVocabularyProps> = (props) => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <ContainerBox style={styles.containerBox}>
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
    </View>
  );
};

export default ItemVocabulary;

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 2,
    borderRadius: 5,
  },
  containerBox: {
    flex: 1,
    borderRadius: 5,
    marginRight: 0,
    backgroundColor: Colors.CustomWhite,
    flexDirection: 'row',
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

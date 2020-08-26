import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Colors from 'assets/Colors';
import {ContentItemCategoryProps} from 'Views/type';
import {Config} from 'assets/Config';
const {width: WidthScreen} = Dimensions.get('window');
const WidthImage = WidthScreen / 6;
const ContentItemCategory: FC<ContentItemCategoryProps> = (props) => {
  const {item} = props;
  return (
    <TouchableOpacity style={styles.Touch} onPress={props.onPress}>
      <View style={styles.WrapImage}>
        <Image
          style={styles.image}
          resizeMode={'stretch'}
          source={{
            uri: Config.API_URL + Config.PATH_CATEGORY_IMAGE + item?.ImageUrl,
          }}
        />
      </View>
      <View style={styles.WrapContent}>
        <Text style={styles.Word}>{item?.Name}</Text>
        <Text style={styles.WordVn}>{item?.NameVN}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContentItemCategory;

const styles = StyleSheet.create({
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
});
